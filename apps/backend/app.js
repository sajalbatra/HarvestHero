import express from "express";
import { PrismaClient } from '@prisma/client';
import registrationRouter from "./routes/Donor.route.js"; 
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/v1/testing", registrationRouter); // Mount your router at the specified path

// Error handling middleware (if needed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
// async function shutdown() {
//   console.log('Shutting down server...');
//   await prisma.$disconnect();
//   server.close();
//   process.exit(0);
// }


export default app;
