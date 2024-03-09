/*
  Warnings:

  - You are about to drop the `OrdenLista` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientecambio` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientepago` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "clientecambio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "clientepago" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "OrdenLista";
