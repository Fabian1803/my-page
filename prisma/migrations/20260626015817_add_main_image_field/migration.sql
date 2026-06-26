/*
  Warnings:

  - You are about to drop the `Registro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Registro";

-- CreateTable
CREATE TABLE "MediaResource" (
    "id" TEXT NOT NULL,
    "imagenPrincipalUrl" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" VARCHAR(150) NOT NULL,
    "instituto" TEXT,
    "miniaturaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "mediaResourceId" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enlace" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mediaResourceId" TEXT NOT NULL,

    CONSTRAINT "Enlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vineta" (
    "id" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "mediaResourceId" TEXT NOT NULL,

    CONSTRAINT "Vineta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_mediaResourceId_fkey" FOREIGN KEY ("mediaResourceId") REFERENCES "MediaResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enlace" ADD CONSTRAINT "Enlace_mediaResourceId_fkey" FOREIGN KEY ("mediaResourceId") REFERENCES "MediaResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vineta" ADD CONSTRAINT "Vineta_mediaResourceId_fkey" FOREIGN KEY ("mediaResourceId") REFERENCES "MediaResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
