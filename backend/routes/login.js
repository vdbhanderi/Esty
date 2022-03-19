const express = require('express')
const con = require('../databse')
const router = new express.Router()
router.post('/login',  function(req,res){
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
router.post('/api/getProfile',  function(req,res){
  console.log("inside the login")
  console.log(req.body)
  const userId = req.body.userId;
  const sqlget = "Select * from Users WHERE UserId=?";
  con.query(sqlget,[userId],(error,result)=>{
    if (!error) {
        console.log("inside login query");
        console.log(result);
        console.log(result.length == 1)
      if (result.length == 1) {
        console.log(result);
        console.log(userData);
        res.status(200).send(JSON.stringify(result[0]));
       
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
module.exports=router