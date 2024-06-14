/*
  Warnings:

  - Added the required column `password` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Ngo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ngo" ADD COLUMN     "password" TEXT NOT NULL;
