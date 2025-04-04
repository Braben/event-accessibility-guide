const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUsersById,
  updateCreatedUser,
} = require("../controllers/UserController");

router.post("/register", createUser);
router.get("/", getUsers);
router.get("/:uid", getUsersById);
router.patch("/:uid", updateUser);
router.patch("/update-uid/:id", updateCreatedUser)
router.delete("/:uid", deleteUser);

module.exports = router;
