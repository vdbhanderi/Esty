var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const config = require("./config.json");
const fileupload = require("express-fileupload");
const login=require("./routes/login")
const shop=require("./routes/shop")
const dashboard=require("./routes/dashboard");

app.use(fileupload());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: config.frontendURL, credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
//routes

//app.use(login)
app.use(shop)
module.exports = app;