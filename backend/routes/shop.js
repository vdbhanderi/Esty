const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/getShopName', function (req, res) {
    console.log("inside the shop Name")
    console.log(req.body)
    const shopName = req.body.shopName;
    console.log(shopName)

    const sqlget = "Select * from Shop WHERE shopName=?";
    con.query(sqlget, [shopName], (error, result) => {
        if (!error) {
            console.log("inside login query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length == 0) {
                console.log(result);
                res.status(200).send();
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end("Shop name is taken");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});
router.post('/api/getItemListbyShopID', function (req, res) {
    console.log("inside the shop Name")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "Select * from Items WHERE userId=?";
    con.query(sqlget, [userId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length != 0) {
                console.log(result);
                res.status(200).send(JSON.stringify(result));
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end("Shop name is taken");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});
router.post('/api/getShopDetails', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "Select * from Shop WHERE userId=?";
    con.query(sqlget, [userId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length == 1) {
                console.log(result);
                res.status(200).send(JSON.stringify(result));
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end("Shop name is taken");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});

router.post("/api/createShop", (req, res) => {
    console.log("inside create shop api" ,req.body);
    const shopName = req.body.shopName;
    const userId = req.body.userId;
    var sqlInsert ="INSERT INTO Shop (shopName,userId) VALUES (?,?)";
    con.query(sqlInsert, [shopName, userId], (err, result) => {
      console.log("inside sql insert" + err);
      if (!err) {
          console.log("no error create shop query");
          console.log();
        //   if (result.length == 1 && password == result[0].password) {
        //     userData = {
        //     id: result[0].id,
        //     name: result[0].username,
        //     email: result[0].email,
        //     currency: "$",
        //     }
        //   };
          //res.status(200).send(JSON.stringify(userData));
          res.status(200).send();
       
      } else {
          res.status(500).send('There is some issue please try again!')
      }
    });
  });
module.exports = router