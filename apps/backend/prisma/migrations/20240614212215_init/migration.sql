-- DropIndex
DROP INDEX "OTP_email_key";

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OTP_pkey" PRIMARY KEY ("id");
