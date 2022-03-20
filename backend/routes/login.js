const express = require('express')
const con = require('../databse')
const router = new express.Router()
router.post('/api/login',  function(req,res){
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
        if (result.length == 1 ) {
          console.log(result);
          userData = {
            id: result[0].UserId,
            name: result[0].Username,
            email: result[0].UserEmail,
          };
          console.log(userData);
          res.status(200).send(JSON.stringify(userData));
         return
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
  var data;
  const sqlget = "Select * from Users WHERE UserId=?";
  con.query(sqlget,[userId],(error,result)=>{
    if (!error) {
        console.log("inside profile query");
        console.log(result);
        console.log(result.length == 1)
      if (result.length == 1) {
        console.log(result);
        data = {
          email: result[0].userEmail,
          firstName: result[0].firstName,
          UserId: result[0].UserId,
          zip: result[0].userZip,
          phone: result[0].userPhone,
          gender: result[0].gender,
          state: result[0].state,
          country: result[0].userCountry,
          dob: result[0].dob,
          city: result[0].city,
          address: result[0].userAddress,
          username: result[0].userName,
          userImage: result[0].userImage,
      }
        res.status(200).send(JSON.stringify(data));
        return
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
router.post('/api/submitProfile', function (req, res) {
  console.log("inside the shop deatils")
  console.log(req.body)
  const phone = req.body.phone;
  const firstName = req.body.firstName;
  const state = req.body.state;
  const country = req.body.country;
  const gender = req.body.gender;
  const email = req.body.email;
  const zip = req.body.zip;
  const dob = req.body.dob;
  const address = req.body.address;
  const userId = req.body.userId;
  const city = req.body.city;
  const userImage = req.body.userImage;
  const userName = req.body.username;

  const sqlget = "update Users set firstName=?,userImage=?,userName=?,UserPhone=?,userZip=?,userAddress=?,gender=?,dob=?,state=?,UserEmail=?,userCountry=?,city=? WHERE userId=?";
  con.query(sqlget, [firstName,userImage,userName,phone,zip, address,gender,dob,state,email,country,city,userId], (error, result) => {
      if (!error) {
          console.log("inside itemList query");
          console.log(result);
          console.log(result.length == 1)
          
          res.status(200).send();
         

      } 
      else {
          console.log(error)
          res.status(500).send('Something broke!')

      }
    })

})
module.exports=router