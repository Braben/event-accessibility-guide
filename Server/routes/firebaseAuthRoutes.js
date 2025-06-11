const express = require("express");
const { verifyFirebaseToken } = require("../middlewares/firebaseAuth");
const { authorizeUser } = require("../middlewares/authorize");
const {
  signupUser,
  loginUser,
  logout,
} = require("../controllers/firebaseSignUP-LogIn");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", verifyFirebaseToken, loginUser);
router.post("/logout", verifyFirebaseToken, logout);

// 🔹 Route to get authenticated user's profile
router.get("/profile", verifyFirebaseToken, authorizeUser, (req, res) => {
  res.json({
    message: "User authenticated successfully",
    user: req.user, // 🔹 Firebase user details
  });
});

module.exports = router;
