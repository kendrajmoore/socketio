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


// Mongoose Connection
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/socketio";
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
);

//Express View Engine for Handlebars
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})
