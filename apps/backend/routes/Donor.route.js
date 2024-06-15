import { Router } from 'express';
import { donor_signup, donor_login, change_password,} from '../controllers/Donor.controllers.js';

const router = Router();

router.post('/signup', donor_signup);
router.post('/login', donor_login);
router.post('/passwrod_change', change_password);

export default router;
