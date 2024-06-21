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

const NgoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  password: z.string().min(6), 
  address: addressSchema,
  affiliation: z.string(),
  donationType: z.array(z.any()),
  logo:z.string(),
  mission:z.string(),
  type:z.string(),
  website:z.string(),
  legalDoc:z.string(),
  requirement:z.string(),
});


export const Ngo_signup = async (req, res) => {
  const result = NgoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      msg: 'Invalid data',
      errors: result.error.errors,
    });
  }

  const Ngo = result.data;

  try {
    const otpSent = await sendOTP(Ngo.email);

    if (!otpSent) {
      return res.status(500).json({ msg: 'Failed to send OTP' });
    }

    const redisResponse = await client.set(
      Ngo.email,
      JSON.stringify({
        ...Ngo,
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

    // const Ngo = JSON.stringify(await client.get(email));
    const storedNgo = JSON.parse(await client.get(email));

    if (!storedNgo) {
      return res.status(500).json({ msg: 'Failed to retrieve stored Ngo data' });
    }

    const hashedPassword = await bcrypt.hash(storedNgo.password, 10);

    const newNgo = await prisma.Ngo.create({
      data: {
        name: storedNgo.name,
        email: storedNgo.email,
        phoneNumber: storedNgo.phoneNumber,
        password: hashedPassword, // Store hashed password in main database
        affiliation: storedNgo.affiliation,
        donationType: storedNgo.donationType,
        address: {
          create: storedNgo.address,
        },
        logo:storedNgo.logo, 
        mission:storedNgo.mission,     
        type:storedNgo.type,         
        website:storedNgo.website,     
        legalDoc:storedNgo.legalDoc,    
        requirement:storedNgo.requirement, 
      },
    });

    // Delete Ngo data from Redis after successful registration
    await client.del(email);

    const tokenPayload = {
      id: newNgo.id,
      name: newNgo.name,
      email: newNgo.email,
      role: newNgo.role,
    };
    const token = jwt.sign(tokenPayload, your_secret_key, { expiresIn: '1h' });

    res.setHeader('token', token);
    console.log(token)
    return res.status(201).json(newNgo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};


const NgologinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), 
});

export const Ngo_login = async (req, res) => {
  const result = NgologinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      msg: 'Invalid data',
      errors: result.error.errors
    });
  }

  const Ngo = result.data;

  try {
    const existingNgo = await prisma.Ngo.findUnique({
      where: {
        email: Ngo.email
      }
    });

    if (!existingNgo) {
      return res.status(404).json({ msg: 'Ngo not found' });
    }

    const passwordMatch = await bcrypt.compare(Ngo.password, existingNgo.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    
    const tokenPayload = {
      id: existingNgo.id,
      email: existingNgo.email,
      role: existingNgo.role,
    };

    const token = jwt.sign(tokenPayload, your_secret_key, { expiresIn: '1h' });

    res.setHeader('token', token);
    console.log(token)
    res.status(200).json(existingNgo);
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

    const find_user = await prisma.Ngo.update({
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




