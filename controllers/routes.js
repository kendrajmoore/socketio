const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//index page
app.get("/", (req, res) => {
    res.render("homepage.hbs", { currentUser: req.user });
});
