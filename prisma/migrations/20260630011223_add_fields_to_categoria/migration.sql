/*
  Warnings:

  - You are about to drop the column `mediaResourceId` on the `Categoria` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagenUrl` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categoria" DROP CONSTRAINT "Categoria_mediaResourceId_fkey";

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "mediaResourceId",
ADD COLUMN     "destacado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imagenUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_MediaResourceToCategoria" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MediaResourceToCategoria_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MediaResourceToCategoria_B_index" ON "_MediaResourceToCategoria"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- AddForeignKey
ALTER TABLE "_MediaResourceToCategoria" ADD CONSTRAINT "_MediaResourceToCategoria_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaResourceToCategoria" ADD CONSTRAINT "_MediaResourceToCategoria_B_fkey" FOREIGN KEY ("B") REFERENCES "MediaResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
