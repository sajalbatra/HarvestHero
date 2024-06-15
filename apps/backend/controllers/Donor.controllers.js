import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOTP, verifyOTP } from './otp.controller.js';

const prisma = new PrismaClient();

const addressSchema = z.object({
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.number(),
  country: z.string(),
});

const donorSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phoneNumber: z.string().nonempty(),
  password: z.string().min(6), 
  address: addressSchema,
  affiliation: z.string(),
  donationType: z.array(z.any())
});

export const donor_signup = async (req, res) => {
  const result = donorSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      msg: 'Invalid data',
      errors: result.error.errors
    });
  }

  const donor = result.data;

  try {
    const hashedPassword = await bcrypt.hash(donor.password, 10);
    const otpSent = await sendOTP(donor.email);

    if (!otpSent) {
      return res.status(500).json({ msg: 'Failed to send OTP' });
    }

    const otpVerified = await verifyOTP(donor.email);

    if (!otpVerified.success) {
      return res.status(401).json({ msg: otpVerified.error });
    }

    const newDonor = await prisma.donor.create({
      data: {
        name: donor.name,
        email: donor.email,
        phoneNumber: donor.phoneNumber,
        password: hashedPassword,
        affiliation: donor.affiliation,
        donationType: donor.donationType,
        address: {
          create: donor.address
        }
      },
    });

    const tokenPayload = {
      id: newDonor.id,
      name: newDonor.name,
      email: newDonor.email,
      role: newDonor.role,
    };
    const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

    res.setHeader('token', token);
    res.status(201).json(newDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};



const donorloginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), 
});

export const donor_login = async (req, res) => {
  const result = donorloginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      msg: 'Invalid data',
      errors: result.error.errors
    });
  }

  const donor = result.data;

  try {
    const existingDonor = await prisma.donor.findUnique({
      where: {
        email: donor.email
      }
    });

    if (!existingDonor) {
      return res.status(404).json({ msg: 'Donor not found' });
    }

    const passwordMatch = await bcrypt.compare(donor.password, existingDonor.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const otpSent = await sendOTP(donor.email);

    if (!otpSent) {
      return res.status(500).json({ msg: 'Failed to send OTP' });
    }

    const otpVerificationResult = await verifyOTP(donor.email, req.body.otp);

    if (!otpVerificationResult.success) {
      console.log("OTP VERIFICAZATIPN NOT DONE")
      return res.status(401).json({ msg: otpVerificationResult.error });
    }

    const tokenPayload = {
      id: existingDonor.id,
      email: existingDonor.email,
      role: existingDonor.role,
    };

    const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

    res.setHeader('token', token);

    res.status(200).json(existingDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};