import express from "express";
import { PrismaClient } from '@prisma/client';
import allrouter from "./routes/router.route.js"; 
const prisma = new PrismaClient();
import bodyParser from "body-parser";
const app = express();
import cors from "cors"
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}));
// Routes
app.use("/api/v1/testing/donor", allrouter.Donorrouter); // Mount your router at the specified path
app.use("/api/v1/testing/ngo", allrouter.Ngorouter); // Mount your router at the specified path
app.use("/api/v1/testing", allrouter.otprouter); // Mount your router at the specified path

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
