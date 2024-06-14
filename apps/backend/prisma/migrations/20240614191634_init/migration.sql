/*
  Warnings:

  - Changed the type of `affiliation` on the `Donor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `donationType` on the `Donor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `requirement` on the `NGOProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `affiliation` on the `Ngo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `donationType` on the `Ngo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "affiliation",
ADD COLUMN     "affiliation" TEXT NOT NULL,
DROP COLUMN "donationType",
ADD COLUMN     "donationType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NGOProfile" DROP COLUMN "requirement",
ADD COLUMN     "requirement" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ngo" DROP COLUMN "affiliation",
ADD COLUMN     "affiliation" TEXT NOT NULL,
DROP COLUMN "donationType",
ADD COLUMN     "donationType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DonationType";

-- DropEnum
DROP TYPE "Organisation";
