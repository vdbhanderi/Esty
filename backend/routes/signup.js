var express = require("express");
var router = express.Router();
var connection = require('../databse')
var kafka = require("../kafka/client");
const { REGISTER_TOPIC } = require("../kafka/topics");
var jwt = require('jsonwebtoken');
const config=require("../config")

router.post("/api/register1", (req, res) => {
  console.log("inside signup api" + req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  var sqlInsert =
    "INSERT INTO Users (firstname ,userEmail, password) VALUES (?,?,?)";
  var sqlget2 = "Select * from Users WHERE userEmail=? AND password=?";
  connection.query(sqlInsert, [username, email, password], (err, result) => {
    console.log("inside sqlinsert" + err);
    if (!err) {
      console.log("no error insert query");
      connection.query(sqlget2, [email, password], (err, result2) => {
        if (!err) {
          console.log("result", result)
          if (result2.length == 1 && req.body.password == result2[0].password) {
            userData = {
              id: result2[0].UserId,
              name: result2[0].userName,
              email: result2[0].userEmail,
              currency: "$",
            };
            res.status(200).send(JSON.stringify(userData.id));
            return
          } else {
            res.writeHead(204, {
              "Content-Type": "text/plain",
            });
            res.end("Invalid credentials");
          }
        } else {
          console.log(err);
          res.writeHead(204, {
            "Content-Type": "text/plain",
          });
          res.status(404);
          res.end("Database issues");
        }
      });
    } else {
      res.status(500).send('Something broke!')
    }
  });
});
router.post('/api/register', function (req, res) {
  console.log("inside the submitProfile")
  console.log(req.body)
  kafka.make_request(REGISTER_TOPIC, req.body, function (err, results) {
    console.log("In make request call back");
    console.log(results);
    console.log(err);
    if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
    } else {
      const token = jwt.sign(
        {
          id: results.data._id,
        },
        config.secretkey,
        {
          expiresIn: 1008000,
        }
      );
      const jwtToken = `JWT ${token}`;
      console.log(jwtToken)
        console.log("Inside else");
        var newData={...results.data,token:jwtToken}
        console.log(newData);
        return res.status(results.status).send(JSON.stringify(newData));
    }
});

})
module.exports = router;