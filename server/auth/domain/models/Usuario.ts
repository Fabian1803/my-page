// server/auth/domain/models/Usuario.ts
export interface UsuarioProps {
  id?: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
}

export class Usuario {
  private props: UsuarioProps;
  constructor(props: UsuarioProps) {
    if (!props.email || !props.email.includes("@")) throw new Error("El correo electrónico proporcionado no es válido.");
    if (!props.passwordHash || props.passwordHash.trim() === "") throw new Error("El hash de la contraseña es requerido.");

    this.props = {
      ...props,
      id: props.id || crypto.randomUUID(),
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): string { return this.props.id!; }
  public get email(): string { return this.props.email; }
  public get passwordHash(): string { return this.props.passwordHash; }
  public get createdAt(): Date { return this.props.createdAt!; }

  public toObject() { return { ...this.props }; }
}