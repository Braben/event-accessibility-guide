const express = require("express");
// const { ADMIN } = require("../utils/constants");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isAuth, authorizeUser } = require("../middlewares/isAuth");
const {
  createVenue,
  getAllVenues,
  getAVenue,
  updateVenue,
  deleteVenue,
} = require("../controllers/venueControllers");

const router = express.Router();

router.get("/", getAllVenues);
router.get("/:id", getAVenue);
router.post("/", createVenue);
router.put("/:id", updateVenue);
router.delete("/:id", deleteVenue);
router.post("/", isAuth, authorizeUser("ADMIN"), createVenue);
router.put("/:id", isAuth, authorizeUser("ADMIN"), updateVenue);
router.delete("/:id", isAuth, authorizeUser("ADMIN"), deleteVenue);

module.exports = router;
