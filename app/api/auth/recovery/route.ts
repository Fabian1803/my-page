import { NextResponse } from "next/server";
import { prisma } from "@/server/shared/infrastructure/prisma";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, webauthnResponse, expectedChallenge } = body;

    // 1. Validaciones iniciales
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

    // 3. Verificación e Inserción del Dispositivo WebAuthn
    if (webauthnResponse) {
      const urlObj = new URL(request.url);
      
      // Validar la respuesta del navegador usando SimpleWebAuthn
      const verification = await verifyRegistrationResponse({
        response: webauthnResponse,
        expectedChallenge: expectedChallenge || "challenge_temporal_f12", // Debe coincidir con el del F12
        expectedOrigin: urlObj.origin,
        expectedRPID: urlObj.hostname,
      });

      if (!verification.verified || !verification.registrationInfo) {
        return NextResponse.json({ success: false, error: "Verificación WebAuthn fallida" }, { status: 400 });
      }

      // Solución al tipado de las nuevas versiones de SimpleWebAuthn
      const { credential } = verification.registrationInfo;
      const { id, publicKey, counter } = credential;

      // Convertir datos binarios a los formatos string de tu DB
      const publicKeyBase64 = Buffer.from(publicKey).toString("base64");
      const credentialIdString = Buffer.from(id).toString("base64url");

      // Guardar o actualizar el dispositivo asociado al usuario
      await prisma.dispositivo.upsert({
        where: { credentialId: credentialIdString },
        update: { 
          publicKey: publicKeyBase64, 
          counter: counter 
        },
        create: {
          credentialId: credentialIdString,
          publicKey: publicKeyBase64,
          counter: counter,
          usuarioId: usuario.id
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        email: usuario.email,
        passwordSaved: Boolean(passwordHash),
        dispositivoGuardado: Boolean(webauthnResponse),
      },
    });

  } catch (error: any) {
    console.error("❌ Error en registro:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Error interno al procesar el registro" 
    }, { status: 500 });
  }
}