const express = require("express");
const router = express.Router();

const {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userProfileController");
const isAuth = require("../middlewares/isAuth");

router.get("/:id", isAuth, userProfile);
router.put("/:id", isAuth, updateUserProfile);
// Router.delete("/:id", isAuth, deleteUserProfile);

module.exports = router;
