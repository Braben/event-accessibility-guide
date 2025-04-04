const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoute = require("./routes/userRoutes");
const venueRoutes = require("./routes/venueRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const loginRoute = require("./routes/loginRoutes");
const profileRoute = require("./routes/profileRoutes");
const cookieParser = require("cookie-parser");
// const prisma = require("./prisma");

//for firebase
const firebaseAuthRoutes = require("./routes/firebaseAuthRoutes");
// Create Express app
const app = express();

const allowedOrigins = [
  "http://localhost:5174", // Local development
  "https://venuehubs.netlify.app/", // Production frontend
];

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true,
}));

app.use(cookieParser());  
app.use(express.json());

// Connect to routes
app.use("/venues", venueRoutes)
app.use("/reviews", reviewRoutes)
app.use("/api", searchRoutes)
// app.use(userRoutes);
app.use("/users", userRoute);
app.use("/user", loginRoute);
app.use("/profile", profileRoute);
// app.use("/auth", loginRoute);

//for firebase
app.use("/", firebaseAuthRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
