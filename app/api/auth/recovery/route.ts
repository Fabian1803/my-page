import { NextResponse } from "next/server";
import { prisma } from "@/server/shared/infrastructure/prisma";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, webauthnResponse } = body;

    if (!email) return NextResponse.json({ success: false, error: "Falta email" }, { status: 400 });
    const cleanEmail = email.trim().toLowerCase();

    // 1. Asegurar el usuario administrador
    const passwordHash = await bcrypt.hash(password || "yolo123456789", 10);
    const usuario = await prisma.usuario.upsert({
      where: { email: cleanEmail },
      update: { passwordHash },
      create: {
        id: crypto.randomUUID(),
        email: cleanEmail,
        passwordHash,
      },
    });

    if (webauthnResponse) {
      const urlObj = new URL(request.url);

      const verification = await verifyRegistrationResponse({
        response: webauthnResponse,
        expectedChallenge: "Y2hhbGxlbmdlX3RlbXBvcmFsX2YxMg", // challenge_temporal_f12
        expectedOrigin: urlObj.origin,
        expectedRPID: urlObj.hostname,
      });

      if (!verification.verified || !verification.registrationInfo) {
        return NextResponse.json({ success: false, error: "Verificación WebAuthn fallida" }, { status: 400 });
      }

      const { credential } = verification.registrationInfo;

      // 🔴 AQUÍ ESTÁ EL CAMBIO CLAVE:
      // Tu login original usa: Buffer.from(dispositivo.publicKey, "base64")
      // Por ende, guardamos directamente el Buffer binario puro de SimpleWebAuthn serializado en base64 estándar.
      const credentialIdString = webauthnResponse.id; // ID nativo de la respuesta string base64url
      const publicKeyBase64 = Buffer.from(credential.publicKey).toString("base64");

      await prisma.dispositivo.upsert({
        where: { credentialId: credentialIdString },
        update: {
          publicKey: publicKeyBase64,
          counter: credential.counter,
          usuarioId: usuario.id
        },
        create: {
          id: crypto.randomUUID(),
          credentialId: credentialIdString,
          publicKey: publicKeyBase64,
          counter: credential.counter,
          usuarioId: usuario.id
        },
      });
    }

    return NextResponse.json({ success: true, message: "¡Sincronización de llaves completada!" });

  } catch (error: any) {
    console.error("Error en recovery:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}