const express = require("express");
const { searchVenues } = require("../Controllers/searchController")

const router = express.Router();
router.get("/venues/search", searchVenues); 

module.exports = router;
