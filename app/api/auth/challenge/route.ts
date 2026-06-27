// app/api/auth/challenge/route.ts
import { GenerateLoginChallengeUseCase } from "@/server/auth/application/GenerateLoginChallengeUseCase";
import { PrismaAuthRepository } from "@/server/auth/infrastructure/adapters/PrismaAuthRepository";
import { makeRouteAuth } from "@/server/auth/infrastructure/makeRouteAuth";

const authRepository = new PrismaAuthRepository();
const generateLoginChallengeUseCase = new GenerateLoginChallengeUseCase(authRepository);
export const POST = makeRouteAuth(generateLoginChallengeUseCase);