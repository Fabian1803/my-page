// app/api/auth/verify-challenge/route.ts
import { VerifyLoginChallengeUseCase } from "@/server/auth/application/VerifyLoginChallengeUseCase";
import { PrismaAuthRepository } from "@/server/auth/infrastructure/adapters/PrismaAuthRepository";
import { makeRouteAuth } from "@/server/auth/infrastructure/makeRouteAuth";
const authRepository = new PrismaAuthRepository();
const verifyLoginChallengeUseCase = new VerifyLoginChallengeUseCase(authRepository);
export const POST = makeRouteAuth(verifyLoginChallengeUseCase);