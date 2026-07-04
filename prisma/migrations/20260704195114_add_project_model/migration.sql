-- AlterTable
ALTER TABLE "MediaResource" ADD COLUMN     "proyectoId" TEXT;

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'PROYECTO',
    "nombre" TEXT NOT NULL,
    "descripcion" VARCHAR(150) NOT NULL,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "categorias" TEXT[],
    "enlaces" JSONB,
    "seccionesDoc" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "portadaId" TEXT,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proyecto_portadaId_key" ON "Proyecto"("portadaId");

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_portadaId_fkey" FOREIGN KEY ("portadaId") REFERENCES "MediaResource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaResource" ADD CONSTRAINT "MediaResource_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
