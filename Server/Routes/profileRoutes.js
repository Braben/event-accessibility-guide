const express = require("express");
const Router = express.Router();

const {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../Controllers/userProfileController");
const isAuth = require("../middlewares/isAuth");

Router.get("/user/:id", userProfile);
Router.put("/user/:id", updateUserProfile);
Router.delete("/user/:id", deleteUserProfile);

module.exports = Router;
