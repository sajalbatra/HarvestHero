-- CreateEnum
CREATE TYPE "Organisation" AS ENUM ('RESTAURANT', 'INDIVIDUAL', 'GROCERY_STORE', 'HOSPITAL', 'SCHOOL', 'CHURCH', 'NON_PROFIT_ORG', 'OTHER');

-- CreateEnum
CREATE TYPE "DonationType" AS ENUM ('FOOD', 'CLOTHES', 'MONETARY', 'BOOKS', 'TOYS', 'MEDICAL_SUPPLIES', 'TECHNOLOGY', 'OTHERS');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'NGO');

-- CreateEnum
CREATE TYPE "NGOType" AS ENUM ('NON_PROFIT', 'CHARITY', 'FOUNDATION', 'EDUCATIONAL', 'RELIGIOUS', 'HEALTHCARE', 'ENVIRONMENTAL');

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "affiliation" "Organisation" NOT NULL DEFAULT 'INDIVIDUAL',
    "donationType" "DonationType"[],

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NGOProfile" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "type" "NGOType" NOT NULL,
    "website" TEXT NOT NULL,
    "legalDoc" TEXT NOT NULL,
    "requirement" "DonationType"[],

    CONSTRAINT "NGOProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ngo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "affiliation" "Organisation" NOT NULL DEFAULT 'INDIVIDUAL',
    "donationType" "DonationType"[],

    CONSTRAINT "Ngo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DonorAddresses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NGOAddresses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NGOProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_phoneNumber_key" ON "Donor"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Ngo_email_key" ON "Ngo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ngo_phoneNumber_key" ON "Ngo"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_DonorAddresses_AB_unique" ON "_DonorAddresses"("A", "B");

-- CreateIndex
CREATE INDEX "_DonorAddresses_B_index" ON "_DonorAddresses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NGOAddresses_AB_unique" ON "_NGOAddresses"("A", "B");

-- CreateIndex
CREATE INDEX "_NGOAddresses_B_index" ON "_NGOAddresses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NGOProfile_AB_unique" ON "_NGOProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_NGOProfile_B_index" ON "_NGOProfile"("B");

-- AddForeignKey
ALTER TABLE "_DonorAddresses" ADD CONSTRAINT "_DonorAddresses_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonorAddresses" ADD CONSTRAINT "_DonorAddresses_B_fkey" FOREIGN KEY ("B") REFERENCES "Donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NGOAddresses" ADD CONSTRAINT "_NGOAddresses_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NGOAddresses" ADD CONSTRAINT "_NGOAddresses_B_fkey" FOREIGN KEY ("B") REFERENCES "Ngo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NGOProfile" ADD CONSTRAINT "_NGOProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "NGOProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NGOProfile" ADD CONSTRAINT "_NGOProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Ngo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
