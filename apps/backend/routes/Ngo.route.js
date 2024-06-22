import { Router } from 'express';
import { Ngo_signup, Ngo_login, change_password, verify_otp,} from '../controllers/Ngo.controllers.js';
//import { handleLogoUpload, handleLegalDocUpload } from '../utils/fileupload.js';
import {handleFileUpload} from "../middlewares/fileupload.js"
const router = Router();

router.post('/signup',handleFileUpload,Ngo_signup);
router.post('/login', Ngo_login);
router.post('/passwrod_change', change_password);
router.post('/verify_otp', verify_otp);


export default router;
