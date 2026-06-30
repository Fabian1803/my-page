// server/resources/domain/models/Resource.ts
export interface ResourceProps {
  id?: string;
  tipo: string;
  nombre: string;
  descripcion: string;
  instituto?: string | null;
  imagenPrincipalUrl: string;
  miniaturaUrl?: string | null;
  categorias: string[];
  enlaces: { tipo: string; url: string }[];
  vinetas: string[];
}

export class Resource {
  private props: ResourceProps;
  constructor(props: ResourceProps) {
    if (!props.nombre || props.nombre.trim() === "") throw new Error("El nombre del recurso es obligatorio.");
    if (props.descripcion.length > 150) throw new Error("La descripción no puede superar los 150 caracteres.");
    if (!props.imagenPrincipalUrl) throw new Error("La imagen principal es totalmente requerida.");

    this.props = {
      ...props,
      id: props.id || crypto.randomUUID(),
    };
  }

  public toObject() {
    return { ...this.props };
  }
}