const express = require("express");

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

module.exports = router;
