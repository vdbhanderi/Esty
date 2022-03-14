var express = require("express");
var router = express.Router();

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
        connection.query(sqlget2, [email, password], (err, result) => {
          if (!err) {
            if (result.length == 1 && req.body.password == result[0].password) {
              userData = {
                id: result[0].id,
                name: result[0].username,
                email: result[0].email,
                currency: "$",
              };
              res.status(200).send(JSON.stringify(userData));
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
      // res.send("landing page, inserted values in db");
    });
    // console.log(email);
  });
  
  module.exports = router;