-- CreateTable
CREATE TABLE "CategoriaAdmin" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "icono" TEXT NOT NULL,

    CONSTRAINT "CategoriaAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenLista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "pedido" JSONB NOT NULL,

    CONSTRAINT "OrdenLista_pkey" PRIMARY KEY ("id")
);
