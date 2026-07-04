import { NextResponse } from "next/server";
import { prisma } from "@/server/shared/infrastructure/prisma";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, webauthnResponse, expectedChallenge } = body;
        // `webauthnResponse` es el objeto directo que devuelve `navigator.credentials.create()` convertido a JSON

        if (!email) return NextResponse.json({ success: false, error: "Falta email" }, { status: 400 });

        // 1. Manejo del usuario
        const passwordHash = password ? await bcrypt.hash(password, 10) : "";
        const usuario = await prisma.usuario.upsert({
            where: { email },
            update: password ? { passwordHash } : {},
            create: { email, passwordHash }
        });

        // 2. Si vienes a registrar el dispositivo usando SimpleWebAuthn
        if (webauthnResponse) {
            const urlObj = new URL(request.url);

            const verification = await verifyRegistrationResponse({
                response: webauthnResponse,
                expectedChallenge: expectedChallenge || "el_challenge_que_usaste_en_f12",
                expectedOrigin: urlObj.origin,
                expectedRPID: urlObj.hostname,
            });

            if (verification.verified && verification.registrationInfo) {
                // 1. Accedemos al objeto 'credential' dentro de registrationInfo
                const { credential } = verification.registrationInfo;

                const { id, publicKey, counter } = credential;

                // 2. Convertimos la llave pública binaria a Base64 para tu Base de Datos
                const publicKeyBase64 = Buffer.from(publicKey).toString("base64");

                // 3. Convertimos el ID binario a String (en formato Base64URL)
                const credentialIdString = Buffer.from(id).toString("base64url");

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
        } else {
            return NextResponse.json({ success: false, error: "Verificación WebAuthn fallida" }, { status: 400 });
        }
    }

    return NextResponse.json({ success: true });
} catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
}
}