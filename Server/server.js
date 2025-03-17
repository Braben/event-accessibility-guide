const express = require("express");
const cors = require("cors");
const venueRoutes = require("./routes/venueRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const searchRoutes = require("./routes/searchRoutes")
const prisma = require("./prisma");

// Connect to Prisma
const app = express();
app.use(cors());
app.use(express.json());

// Connect to routes
app.use("/venues", venueRoutes)
app.use("/reviews", reviewRoutes)
app.use("/api", searchRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
