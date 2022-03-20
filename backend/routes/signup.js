var express = require("express");
var router = express.Router();
var connection = require('../databse')
router.post("/api/register", (req, res) => {
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

module.exports = router;