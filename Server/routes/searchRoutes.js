const express = require("express");
const { searchVenues } = require("../controllers/searchController");

const router = express.Router();
router.get("/search", searchVenues);

module.exports = router;
