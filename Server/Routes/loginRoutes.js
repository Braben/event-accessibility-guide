const express = require("express");
const Router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { loginUser } = require("../Controllers/LoginController");

Router.post("/login", loginUser);

module.exports = Router;
