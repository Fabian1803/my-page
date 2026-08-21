export interface UpdatePasswordInputDTO {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateEmailInputDTO {
  newEmail: string;
  currentPassword: string;
}

export interface DeviceInfoDTO {
  id: string;
  credentialId: string;
  counter: number;
  createdAt?: string;
}

export interface SecurityProfileResponseDTO {
  user: {
    id: string;
    email: string;
    createdAt?: Date;
  };
  devices: DeviceInfoDTO[];
}

export interface RegisterDeviceChallengeResponseDTO {
  options: any;
  email: string;
}

export interface VerifyRegisterDeviceInputDTO {
  body: any;
  expectedChallenge: string;
}
