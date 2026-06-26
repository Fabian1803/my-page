// server/auth/domain/models/Dispositivo.ts

export interface DispositivoProps {
  id?: string;
  credentialId: string;
  publicKey: string;
  counter: number;
  usuarioId: string;
}

export class Dispositivo {
  private props: DispositivoProps;

  constructor(props: DispositivoProps) {
    if (!props.credentialId) throw new Error("El credentialId es requerido.");
    if (!props.publicKey) throw new Error("La llave pública es requerida.");
    if (props.counter < 0) throw new Error("El contador no puede ser negativo.");
    if (!props.usuarioId) throw new Error("El ID de usuario asociado es requerido.");

    this.props = {
      ...props,
      id: props.id || crypto.randomUUID(),
    };
  }

  public get id(): string { return this.props.id!; }
  public get credentialId(): string { return this.props.credentialId; }
  public get publicKey(): string { return this.props.publicKey; }
  public get counter(): number { return this.props.counter; }
  public get usuarioId(): string { return this.props.usuarioId; }
  public updateCounter(newCounter: number): void {
    if (newCounter <= this.props.counter) throw new Error("El nuevo contador debe ser mayor al actual.");
    this.props.counter = newCounter;
  }

  public toObject() { return { ...this.props }; }
}