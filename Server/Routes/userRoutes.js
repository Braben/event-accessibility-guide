const express = require("express");
const Router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUsersById,
} = require("../Controllers/UserController");

Router.post("/register", createUser);
Router.get("/", getUsers);
Router.get("/:id", getUsersById);
Router.patch("/:id", updateUser);
Router.delete("/:id", deleteUser);

module.exports = Router;
