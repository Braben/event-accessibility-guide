const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUsersById,
} = require("../controllers/UserController");

router.post("/register", createUser);
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
