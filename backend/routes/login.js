const express = require('express')
const con = require('../databse')
const { GETPROFILE_TOPIC, SUBMITPROFILE_TOPIC, LOGIN_TOPIC } = require('../kafka/topics')
const router = new express.Router()
var kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");
// router.post('/api/login', function (req, res) {
//   console.log("inside the login")
//   console.log(req.body)
//   const email = req.body.email;
//   const password = req.body.password;
//   const sqlget = "Select * from Users WHERE UserEmail=? AND Password=?";
//   con.query(sqlget, [email, password], (error, result) => {
//     if (!error) {
//       console.log("inside login query");
//       console.log(result);
//       console.log(result !== null)
//       if (result !== null && result.length == 1) {
//         console.log(result);
//         userData = {
//           id: result[0].UserId,
//           name: result[0].Username,
//           email: result[0].UserEmail,
//         };
//         console.log(userData);
//         res.status(200).send(JSON.stringify(userData));
//         return
//       } else {
//         res.writeHead(204, {
//           "Content-Type": "text/plain",
//         });
//         res.end("Invalid credentials");
//       }
//     } else {
//       res.status(500).send('Something broke!')

//     }
//   });
//   kafka.make_request(GETPROFILE_TOPIC, req.body, function (err, results) {
//     console.log("In make request call back");
//     console.log(results);
//     console.log(err);
//     if (err) {
//         console.log("Inside err");
//         console.log(err);
//         return res.status(err.status).send(err.message);
//     } else {
//         console.log("Inside else");
//         console.log(results);
//         return res.status(results.status).send(results.data);
//     }
// });

// })

router.post("/api/login", (req, res) => {
  console.log("Inside login Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request(LOGIN_TOPIC, req.body, function (err, results) {
    console.log("in make request call back");
    console.log(results);
    console.log(err);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("Inside else");
      console.log(results);
      return res.status(results.status).send(results.data);
    }
  });
});

router.post('/api/getProfile', function (req, res) {
  console.log("inside the login")
  console.log(req.body)
  kafka.make_request(GETPROFILE_TOPIC, req.body, function (err, results) {
    console.log("In make request call back");
    console.log(results);
    console.log(err);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("Inside else");
      console.log(results);
      return res.status(results.status).send(results.data);
    }
  });
})
router.post('/api/submitProfile', function (req, res) {
  console.log("inside the submitProfile")
  console.log(req.body)
  kafka.make_request(SUBMITPROFILE_TOPIC, req.body, function (err, results) {
    console.log("In make request call back");
    console.log(results);
    console.log(err);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("Inside else");
      console.log(results);
      return res.status(results.status).send(results.data);
    }
  });

})
module.exports = router