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


  

  app.post('/login',  function(req,res){
      console.log("inside the login")
      console.log(req.body)
      const email = req.body.email;
      const password = req.body.password;
      const sqlget = "Select * from Users WHERE UserEmail=? AND Password=?";
      con.query(sqlget,[email, password],(error,result)=>{
        if (!error) {
            console.log("inside login query");
            console.log(result);
            console.log(req.body.password === result[0].password)
            console.log(result.length == 1)
          if (result.length == 1 && req.body.password === result[0].Password) {
            console.log(result);
            userData = {
              id: result[0].UserId,
              name: result[0].Username,
              email: result[0].UserEmail,
            };
            console.log(userData);
            res.status(200).send(JSON.stringify(userData));
           
          } else {
            res.writeHead(204, {
              "Content-Type": "text/plain",
            });
            res.end("Invalid credentials");
          }
        } else {
            res.status(500).send('Something broke!')
    
        }
      });
  })