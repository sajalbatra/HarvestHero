import { Router } from 'express'; // Import Router from Express
import { donor_login, donor_signup } from '../controllers/Donor.controllers.js'; // Adjust path as needed
//import { app } from "../../backend/app"; // Assuming app is exported from app.js

const router = Router(); // Create a Router instance

router.post("/donor_signup", donor_signup);
router.post("/donor_login", donor_login); // Corrected route definition ("/" was missing)

export default router; // Export the router

