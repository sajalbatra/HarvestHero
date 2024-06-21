/*
  Warnings:

  - You are about to drop the column `nGOProfileId` on the `Ngo` table. All the data in the column will be lost.
  - You are about to drop the `NGOProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `legalDoc` to the `Ngo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Ngo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mission` to the `Ngo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirement` to the `Ngo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Ngo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Ngo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ngo" DROP CONSTRAINT "Ngo_nGOProfileId_fkey";

-- DropIndex
DROP INDEX "Ngo_nGOProfileId_key";

-- AlterTable
ALTER TABLE "Ngo" DROP COLUMN "nGOProfileId",
ADD COLUMN     "legalDoc" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "mission" TEXT NOT NULL,
ADD COLUMN     "requirement" TEXT NOT NULL,
ADD COLUMN     "type" "NGOType" NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;

-- DropTable
DROP TABLE "NGOProfile";
