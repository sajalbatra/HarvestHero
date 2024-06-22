import { Router } from 'express';
import { donor_signup, donor_login, change_password, verify_otp,} from '../controllers/Donor.controllers.js';

const router = Router();

router.post('/signup', donor_signup);
router.post('/login', donor_login);
router.post('/password_change', change_password);
router.post('/verify_otp', verify_otp);


export default router;
