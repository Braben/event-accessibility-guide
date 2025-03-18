const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoute = require("./Routes/userRoutes");
const loginRoute = require("./Routes/loginRoutes");
const profileRoute = require("./Routes/profileRoutes");
const cors = require("cors");
const venueRoutes = require("./routes/venueRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const prisma = require("./prisma");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to routes
app.use("/venues", venueRoutes);
app.use("/reviews", reviewRoutes);
app.use("/api", searchRoutes);

// Routes
app.use(userRoute);
app.use(loginRoute);
app.use(profileRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
