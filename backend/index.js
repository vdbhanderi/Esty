const app = require("./app");
const mysql = require('mysql2');
const con = require('./databse');
const bodyParser = require('body-parser');
const passport = require("passport");
//const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const config=require('./config.json')
const path = require('path');
const fs = require('fs');
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render('login')
})
app.listen(3000,()=>{
    console.log("listening to port 3000")
})


  

  