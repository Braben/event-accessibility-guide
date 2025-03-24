const express = require("express");
const { isAuth } = require("../middlewares/isAuth"); // ✅ Correct import

const { loginUser, logoutUser } = require("../controllers/loginController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", isAuth, logoutUser);

module.exports = router;
