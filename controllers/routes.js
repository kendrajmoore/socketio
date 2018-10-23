const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

//index page
router.get("/", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/user/login");
    }
    res.render("index.hbs", { currentUser: req.user });
});

router.get("/admin", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/user/login");
    }
    res.render("index.hbs", { currentUser: req.user });
});

module.exports = router;
