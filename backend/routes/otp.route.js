import {Router} from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';

const router = Router();

router.get('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

export default router