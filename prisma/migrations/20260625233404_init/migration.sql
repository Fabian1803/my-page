-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titulo" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);
