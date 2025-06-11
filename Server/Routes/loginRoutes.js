const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
const { loginUser, logoutUser } = require("../controllers/loginController");

router.post("/login", loginUser);
router.post("/logout", isAuth, logoutUser);

module.exports = router;
