export interface VerifyChallengeInputDTO {
  body: any;
  expectedChallenge: string;
  email: string;
}
export interface VerifyChallengeResponseDTO {
  id: string;
  email: string;
  success: boolean;
  message: string;
}
