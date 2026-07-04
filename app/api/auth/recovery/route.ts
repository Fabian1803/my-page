import { NextResponse } from "next/server";
import { prisma } from "@/server/shared/infrastructure/prisma";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import bcrypt from "bcrypt";
import * as jose from "jose"; // Cambiado a 'jose'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, webauthnResponse } = body;

    // 1. Validaciones básicas obligatorias
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "El email es obligatorio" }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();

    // 2. Gestión de Usuario (Upsert manual)
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    const existingUser = await prisma.usuario.findUnique({ where: { email: cleanEmail } });

    const usuario = existingUser
      ? await prisma.usuario.update({
          where: { id: existingUser.id },
          data: passwordHash ? { passwordHash } : {},
        })
      : await prisma.usuario.create({
          data: {
            email: cleanEmail,
            passwordHash: passwordHash || "",
          },
        });

    // 3. Verificación e Inserción de las credenciales WebAuthn (Biométricos)
    if (webauthnResponse) {
      const urlObj = new URL(request.url);
      
      const verification = await verifyRegistrationResponse({
        response: webauthnResponse,
        expectedChallenge: "Y2hhbGxlbmdlX3RlbXBvcmFsX2YxMg", // Parche estricto Base64URL
        expectedOrigin: urlObj.origin,
        expectedRPID: urlObj.hostname,
      });

      if (!verification.verified || !verification.registrationInfo) {
        return NextResponse.json({ success: false, error: "Verificación WebAuthn fallida" }, { status: 400 });
      }

      const { credential } = verification.registrationInfo;
      const { id, publicKey, counter } = credential;

      const publicKeyBase64 = Buffer.from(publicKey).toString("base64");
      const credentialIdString = Buffer.from(id).toString("base64url");

      await prisma.dispositivo.upsert({
        where: { credentialId: credentialIdString },
        update: { publicKey: publicKeyBase64, counter },
        create: {
          credentialId: credentialIdString,
          publicKey: publicKeyBase64,
          counter,
          usuarioId: usuario.id
        }
      });
    }

    // 4. Generación del Token JWT usando 'jose'
    const secretText = process.env.JWT_SECRET || "fallback_secret_por_si_acaso_super_largo";
    const secretUint8 = new TextEncoder().encode(secretText); // 'jose' requiere un Uint8Array

    const token = await new jose.SignJWT({ id: usuario.id, email: usuario.email })
      .setProtectedHeader({ alg: "HS256" }) // Define el algoritmo de firma
      .setIssuedAt()
      .setExpirationTime("7d") // Expira en 7 días
      .sign(secretUint8);

    return NextResponse.json({
      success: true,
      token, // Te devuelve el string del JWT generado por jose
      data: {
        email: usuario.email,
        passwordSaved: Boolean(passwordHash),
        dispositivoGuardado: Boolean(webauthnResponse),
      },
    });

  } catch (error: any) {
    console.error("❌ Error en el proceso de recuperación con jose:", error);
    return NextResponse.json({ success: false, error: error.message || "Error interno" }, { status: 500 });
  }
}