import { PrismaClient } from '@prisma/client';
import randomstring from 'randomstring';
import sendEmail from '../utils/sendEmails.js';

const prisma = new PrismaClient();

// Generate OTP
function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

// Send OTP to the provided email
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.query;
        const otp = generateOTP(); // Generate a 6-digit OTP

        // Save OTP to database
        await prisma.OTP.create({
            data: {
                email: email,
                otp: otp
            }
        });

        console.log("The OTP is:", otp);

        // Send OTP via email
        await sendEmail({
            to: email,
            subject: 'Your OTP',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Verify OTP provided by the user
export const verifyOTP = async (req, res) => {
    try {
        const { email } = req.query;
        const { otp } = req.body;

        // Find and delete OTP if it matches
        const existingOTP = await prisma.OTP.findFirst({
            where: {
                email: email,
                otp: otp
            }
        });

        if (existingOTP) {
            // OTP is valid
            await prisma.OTP.delete({
                where: {
                    id: existingOTP.id
                }
            });
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            // OTP is invalid
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export default {
    sendOTP,
    verifyOTP
};
