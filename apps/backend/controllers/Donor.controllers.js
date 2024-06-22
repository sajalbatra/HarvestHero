import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOTP, verifyOTP } from './otp.controller.js';
import 'dotenv/config';
import Redis  from "ioredis";

const redis_url=process.env.Redis_url
const client = new Redis(redis_url);
const your_secret_key=process.env.Secret_Key

const prisma = new PrismaClient();

const addressSchema = z.object({
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.number(),
  country: z.string(),
});

const donorSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  password: z.string().min(6), 
  address: addressSchema,
  affiliation: z.string(),
  donationType: z.array(z.any())
});

// export const donor_signup = async (req, res) => {
//   const result = donorSchema.safeParse(req.body);

//   if (!result.success) {
//     return res.status(400).json({
//       msg: 'Invalid data',
//       errors: result.error.errors
//     });
//   }

//   const donor = result.data;

//   try {
//     const hashedPassword = await bcrypt.hash(donor.password, 10);
//     const otpSent = await sendOTP(donor.email);

//     if (!otpSent) {
//       return res.status(500).json({ msg: 'Failed to send OTP' });
//     }

//     const otpVerified = await verifyOTP();   
//     if (!otpVerified) {
//       return res.status(401).json({ msg: otpVerified.error });
//     }
//     const newDonor = await prisma.donor.create({
//       data: {
//         name: donor.name,
//         email: donor.email,
//         phoneNumber: donor.phoneNumber,
//         password: hashedPassword,
//         affiliation: donor.affiliation,
//         donationType: donor.donationType,
//         address: {
//           create: donor.address
//         }
//       },
//     });

//     const tokenPayload = {
//       id: newDonor.id,
//       name: newDonor.name,
//       email: newDonor.email,
//       role: newDonor.role,
//     };
//     const token = jwt.sign(tokenPayload, 'your_secret_key', { expiresIn: '1h' });

//     res.setHeader('token', token);
//     console.log(token)
//     res.status(201).json(newDonor);
    
//   } catch (error) {
//     console.error(error);
//     console.log("error signing in ")
//     res.status(500).json({ msg: 'Internal server error' });
//   }
// };

// -----------------------------------------------


export const donor_signup = async (req, res) => {
  const result = donorSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      msg: 'Invalid data',
      errors: result.error.errors,
    });
  }

  const donor = result.data;

  try {
    const otpSent = await sendOTP(donor.email);

    if (!otpSent) {
      return res.status(500).json({ msg: 'Failed to send OTP' });
    }

    const redisResponse = await client.set(
      donor.email,
      JSON.stringify({
        ...donor,
      }),
      'EX',
      3600  // Expiration time in seconds
    );

    console.log(redisResponse); // Optional: Logging the Redis response
    return res.status(200).json({ msg: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const verify_otp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpVerified = async (email, otp) => {
      try {
        const existingOTP = await prisma.OTP.findFirst({
          where: {
            email: email,
            otp: otp,
          },
        });

        if (!existingOTP) {
          return false;
        }

        await prisma.OTP.delete({
          where: {
            id: existingOTP.id,
          },
        });

        return true;
      } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
      }
    };

    const isOtpVerified = await otpVerified(email, otp);

    if (!isOtpVerified) {
      await client.del(email);
      return res.status(401).json({ msg: 'OTP verification failed' });
    }

    // const donor = JSON.stringify(await client.get(email));
    const storedDonor = JSON.parse(await client.get(email));

    if (!storedDonor) {
      return res.status(500).json({ msg: 'Failed to retrieve stored donor data' });
    }

    const hashedPassword = await bcrypt.hash(storedDonor.password, 10);

    const newDonor = await prisma.donor.create({
      data: {
        name: storedDonor.name,
        email: storedDonor.email,
        phoneNumber: storedDonor.phoneNumber,
        password: hashedPassword, // Store hashed password in main database
        affiliation: storedDonor.affiliation,
        donationType: storedDonor.donationType,
        address: {
          create: storedDonor.address,
        },
      },
    });

    // Delete donor data from Redis after successful registration
    await client.del(email);

    const tokenPayload = {
      id: newDonor.id,
      name: newDonor.name,
      email: newDonor.email,
      role: newDonor.role,
    };
    const token = jwt.sign(tokenPayload, your_secret_key, { expiresIn: '1h' });

    res.setHeader('token', token);
    console.log(token)
    return res.status(201).json(newDonor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
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
    
    const tokenPayload = {
      id: existingDonor.id,
      email: existingDonor.email,
      role: existingDonor.role,
    };

    const token = jwt.sign(tokenPayload, your_secret_key, { expiresIn: '1h' });

    res.setHeader('token', token);
    console.log(token)
    res.status(200).json(existingDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};


export const change_password = async (req, res) => {
  try {
    const token_header = req.headers.authorization.split(" ")[1];
    const password = req.body.password;
    if (!token_header) {
      return res.status(401).send({"msg": "The token is not found"});
    }
    let token_verification;
    try {
      token_verification = jwt.verify(token_header, your_secret_key);
    } catch (err) {
      return res.status(401).send({"msg": "The token is not verified or the user is not verified"});
    }
    
    const useremail = token_verification.email;
    const hashedPassword = await bcrypt.hash(password, 10);

    const find_user = await prisma.donor.update({
      where: {
        email: useremail,
      },
      data: {
        password: hashedPassword
      }
    });
    if (!find_user) {
      return res.status(404).send({"msg": "The user is not found"});
    }
    
    res.send({"msg": "The password successfully changed"});
  } catch (error) {
    console.error(error);
    res.status(500).send({"msg": "Internal server error"});
  }
};



