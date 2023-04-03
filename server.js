var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3001;

// this is the sesisons stuff
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// need this to use the js file and css file for the html pages.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
} else {
  app.use(express.static(__dirname + "/client/build"));
  app.use(express.static(__dirname + "/client/public"));
}

//CORS - react runs on a different port
app.use(cors());

//Router
require("./app/routing/kanjiAPI")(app);

// Listner

app.listen(PORT, function () {
  console.log("App is listening on PORT: " + PORT);
});
