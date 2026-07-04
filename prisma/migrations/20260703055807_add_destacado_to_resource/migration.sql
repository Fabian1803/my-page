-- AlterTable
ALTER TABLE "MediaResource" ADD COLUMN     "destacado" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SeccionDoc" (
    "id" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "contenidoJson" TEXT NOT NULL,
    "mediaResourceId" TEXT NOT NULL,

    CONSTRAINT "SeccionDoc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeccionDoc" ADD CONSTRAINT "SeccionDoc_mediaResourceId_fkey" FOREIGN KEY ("mediaResourceId") REFERENCES "MediaResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
