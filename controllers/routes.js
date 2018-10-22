const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//index page
router.get("/", (req, res) => {
    res.render("index.hbs", { currentUser: req.user });
});

module.exports = router;
