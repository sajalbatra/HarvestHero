import { Router } from 'express';
import { Ngo_signup, Ngo_login, change_password, verify_otp,getNgo} from '../controllers/Ngo.controllers.js';
//import { handleLogoUpload, handleLegalDocUpload } from '../utils/fileupload.js';
import {handleFileUpload} from "../middlewares/fileupload.js"
const router = Router();
import { verifyUser } from '../middlewares/authuser.js';

router.post('/signup',handleFileUpload,Ngo_signup);
router.post('/login', Ngo_login);
router.post('/passwrod_change',verifyUser,change_password);
router.post('/verify_otp', verify_otp);
//router.get('/getngo', verifyUser,getNgo);
router.get('/getngo',getNgo);


export default router;
