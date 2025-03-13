const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoute = require("./Routes/userRoutes");

// Connect to Prisma

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(userRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
