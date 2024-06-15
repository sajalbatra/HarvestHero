import { Router } from 'express';
import { donor_signup, donor_login,} from '../controllers/Donor.controllers.js';

const router = Router();

router.post('/signup', donor_signup);
router.post('/login', donor_login);

export default router;
