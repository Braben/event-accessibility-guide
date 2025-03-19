const express = require("express");
const Router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { loginUser, logoutUser } = require("../Controllers/LoginController");

Router.post("/login", loginUser);
Router.post("/logout", isAuth, logoutUser);

module.exports = Router;
