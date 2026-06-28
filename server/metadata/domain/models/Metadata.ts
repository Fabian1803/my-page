//server/metadata/domain/models/Metadata.ts
import { Sanitizer } from "@/server/metadata/domain/utils/Sanitizer";
export interface MetadataProps {
    id?: string;
    metadatos: Record<string, any> | null;
}
export class Metadata {
    private props: MetadataProps;
    constructor(props: MetadataProps) {
        if (props.metadatos && typeof props.metadatos !== "object") throw new Error("El campo metadatos debe ser un objeto JSON válido.");
        const metadatosLimpios = props.metadatos
            ? Sanitizer.cleanJson(props.metadatos)
            : {};

        this.props = {
            id: props.id || crypto.randomUUID(),
            metadatos: metadatosLimpios,
        };
    }

    public get id(): string { return this.props.id!; }
    public get metadatos(): Record<string, any> { return this.props.metadatos!; }
    public toObject() {
        return { ...this.props };
    }
}
