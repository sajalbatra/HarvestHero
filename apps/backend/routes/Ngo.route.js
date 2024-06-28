import { Router } from 'express';
import { Ngo_signup, Ngo_login, change_password, verify_otp,getNgo} from '../controllers/Ngo.controllers.js';
//import { handleLogoUpload, handleLegalDocUpload } from '../utils/fileupload.js';
import {handleFileUpload} from "../middlewares/fileupload.js"
const router = Router();
import { verifyUser } from '../middlewares/authuser.js';
import redisngo from "../middlewares/redis.ngo.js"
router.post('/signup',handleFileUpload,Ngo_signup);
router.post('/login', Ngo_login);
router.post('/password_change',verifyUser,change_password);
router.post('/verify_otp', verify_otp);
//router.get('/getngo', verifyUser,getNgo);
router.get('/getngo',verifyUser,redisngo,getNgo);


export default router;
