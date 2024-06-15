import { PrismaClient } from '@prisma/client';
import randomstring from 'randomstring';
import sendEmail from '../utils/sendEmails.js';

const prisma = new PrismaClient();

function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

export const sendOTP = async (toemail) => {
    try {
        const otp = generateOTP();
        await prisma.OTP.create({
            data: {
                email: toemail,
                otp: otp,
                createdAt: new Date() 
            }
        });

        console.log("The OTP is:", otp);

        await sendEmail({
            to: toemail,
            subject: 'Your OTP',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
};

export const verifyOTP = async (req, res) => {
    const { email } = req.query; 
    const { otp } = req.body;    

    try {
        const existingOTP = await prisma.OTP.findFirst({
            where: {
                email: email, 
                otp: otp      
            }
        });

        if (!existingOTP) {
            return res.status(401).json({ success: false, error: 'Invalid OTP' });
        }

        await prisma.OTP.delete({
            where: {
                id: existingOTP.id
            }
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};