const express = require("express");
const Router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

Router.post("/register", createUser);
Router.get("/users/:id?", getUsers);
Router.patch("/user/:id", updateUser);
Router.delete("/user/:id", deleteUser);

module.exports = Router;
