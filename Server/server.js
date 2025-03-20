const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoute = require("./routes/userRoutes");
const loginRoute = require("./routes/loginRoutes");
const profileRoute = require("./routes/profileRoutes");
const cors = require("cors");
const venueRoutes = require("./routes/venueRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const cookieParser = require("cookie-parser");
// const prisma = require("./prisma");

// Create Express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Connect to routes
app.use("/venues", venueRoutes);
app.use("/reviews", reviewRoutes);
app.use("/api", searchRoutes);

// Routes
app.use("/users", userRoute);
app.use("/user", loginRoute);
app.use("/profile", profileRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
