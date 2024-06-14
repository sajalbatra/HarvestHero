-- CreateTable
CREATE TABLE "OTP" (
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_key" ON "OTP"("email");
