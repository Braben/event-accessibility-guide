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
Router.get("/users", getUsers);
Router.get("/users/:id", getUsersById);
Router.patch("/user/:id", updateUser);
Router.delete("/user/:id", deleteUser);

module.exports = Router;
