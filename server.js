//server.js
const dotenv = require("dotenv").config();
const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
//Socket.io has to use the http server
const server = require('http').Server(app);

//Socket.io stuff
//app.js
const io = require('socket.io')(server);
//We'll store our online users here
let onlineUsers = {};
//Save the channels in this object.
let channels = {"General" : []}
io.on("connection", (socket) => {
  // Make sure to send the users to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})


// Port
const port = process.env.PORT || 3000;

//SET UP MONGOOSE
const mongoose = require("mongoose");

//middleware
app.use(methodOverride("_method"));
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// static files middleware
app.use(express.static("public"));


// Mongoose Connection
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/socketio";
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
);

//USER AUTH
var checkAuth = (req, res, next) => {
    if (
        typeof req.cookies.nToken === "undefined" ||
        req.cookies.nToken === null
    ) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);


//user routes
const usersController = require("./controllers/users.js");
app.use("/user", usersController);

//more routes
const routesController = require("./controllers/routes.js");
app.use("/longhorn", routesController);

//Express View Engine for Handlebars
// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs")

//index page
app.get("/", (req, res) => {
    res.render("homepage.hbs", { currentUser: req.user });
});

//index page
app.get("/", (req, res) => {
    res.render("homepage.hbs", { currentUser: req.user });
});


//404 page
app.get("*", (req, res) => {
    res.render("error.hbs");
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})

module.exports = app;
