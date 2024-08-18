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
    "password" TEXT NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "addressId" INTEGER NOT NULL,
    "affiliation" TEXT NOT NULL,
    "donationType" TEXT[],

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
    "requirement" TEXT NOT NULL,

    CONSTRAINT "NGOProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ngo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'NGO',
    "addressId" INTEGER NOT NULL,
    "affiliation" TEXT NOT NULL,
    "donationType" TEXT[],
    "nGOProfileId" INTEGER NOT NULL,

    CONSTRAINT "Ngo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_phoneNumber_key" ON "Donor"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_addressId_key" ON "Donor"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Ngo_email_key" ON "Ngo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ngo_phoneNumber_key" ON "Ngo"("phoneNumber");

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
