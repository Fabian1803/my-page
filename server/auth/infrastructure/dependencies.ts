// server/auth/infrastructure/dependencies.ts
import { PrismaAuthRepository } from "./adapters/PrismaAuthRepository";
import { LoginWithPasswordUseCase } from "../application/LoginWithPasswordUseCase";
import { GenerateLoginChallengeUseCase } from "../application/GenerateLoginChallengeUseCase";
import { VerifyLoginChallengeUseCase } from "../application/VerifyLoginChallengeUseCase";
const authRepository = new PrismaAuthRepository();
export const loginWithPasswordUseCase = new LoginWithPasswordUseCase(authRepository);
export const generateLoginChallengeUseCase = new GenerateLoginChallengeUseCase(authRepository);
export const verifyLoginChallengeUseCase = new VerifyLoginChallengeUseCase(authRepository);