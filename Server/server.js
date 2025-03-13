const express = require("express");
const venueRoutes = require("./routes/venueRoutes")
const prisma = require("./prisma");

// Connect to Prisma
const app = express();
app.use(express.json());

// Connect Venue routes
app.use("/venues", venueRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
