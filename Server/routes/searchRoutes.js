const express = require("express");
const { searchVenues } = require("../controllers/searchController");

const router = express.Router();

router.get("/venues/search", searchVenues); 

module.exports = router;
