const express = require("express");
const Router = express.Router();

const {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userProfileController");
const isAuth = require("../middlewares/isAuth");

Router.get("/:id", isAuth, userProfile);
Router.put("/:id", isAuth, updateUserProfile);
// Router.delete("/:id", isAuth, deleteUserProfile);

module.exports = Router;
