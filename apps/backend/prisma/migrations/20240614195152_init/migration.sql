/*
  Warnings:

  - The `donationType` column on the `Donor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `donationType` column on the `Ngo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "donationType",
ADD COLUMN     "donationType" TEXT[];

-- AlterTable
ALTER TABLE "Ngo" DROP COLUMN "donationType",
ADD COLUMN     "donationType" TEXT[];
