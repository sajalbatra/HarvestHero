/*
  Warnings:

  - You are about to drop the `_DonorAddresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NGOAddresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NGOProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Ngo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nGOProfileId]` on the table `Ngo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Ngo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nGOProfileId` to the `Ngo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DonorAddresses" DROP CONSTRAINT "_DonorAddresses_A_fkey";

-- DropForeignKey
ALTER TABLE "_DonorAddresses" DROP CONSTRAINT "_DonorAddresses_B_fkey";

-- DropForeignKey
ALTER TABLE "_NGOAddresses" DROP CONSTRAINT "_NGOAddresses_A_fkey";

-- DropForeignKey
ALTER TABLE "_NGOAddresses" DROP CONSTRAINT "_NGOAddresses_B_fkey";

-- DropForeignKey
ALTER TABLE "_NGOProfile" DROP CONSTRAINT "_NGOProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_NGOProfile" DROP CONSTRAINT "_NGOProfile_B_fkey";

-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ngo" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "nGOProfileId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_DonorAddresses";

-- DropTable
DROP TABLE "_NGOAddresses";

-- DropTable
DROP TABLE "_NGOProfile";

-- CreateIndex
CREATE UNIQUE INDEX "Donor_addressId_key" ON "Donor"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Ngo_addressId_key" ON "Ngo"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Ngo_nGOProfileId_key" ON "Ngo"("nGOProfileId");

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ngo" ADD CONSTRAINT "Ngo_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ngo" ADD CONSTRAINT "Ngo_nGOProfileId_fkey" FOREIGN KEY ("nGOProfileId") REFERENCES "NGOProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
