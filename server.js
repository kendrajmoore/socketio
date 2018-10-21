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
io.on("connection", (socket) => {
  // This file will be read on new socket connections
  require('./sockets/chat.js')(io, socket);
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

//Express View Engine for Handlebars
// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs")

app.get('/', (req, res) => {
  res.render('index.hbs');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})
