//App.js
const express = require('express');
const app = express();
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
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


//middleware
app.use(methodOverride("_method"));
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

// static files middleware
app.use(express.static("public"));


app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs")

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})

module.exports = app;
