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

    const sqlget = "Select * from Items WHERE shopID=?";
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
    const shopID = req.body.shopID;
    console.log(shopID)

    const sqlget = "Select * from Shop WHERE shopId=?";
    con.query(sqlget, [shopID], (error, result) => {
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
    const sqlInsert ="INSERT INTO Shop (shopName,userId) VALUES (?,?)";
    const sqlget2 = "Select * from Shop where shopName=?";
    con.query(sqlInsert, [shopName, userId], (err, result) => {
      console.log("inside sql insert" + err);
      if (!err) {
          console.log("no error create shop query");
          console.log();
          con.query(sqlget2, [shopName], (err, result) => {
            if (!err) {
              console.log(result)
              console.log(result.length)
              if (result.length == 1) {
                  userData = {
                    shopId: result[0].shopId,
                };
                res.status(200).send(JSON.stringify(userData));
              } else {
                res.writeHead(204, {
                  "Content-Type": "text/plain",
                });
                res.end("Duplicate Shop");
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
          res.status(500).send('There is some issue please try again!')
      }
    });
  });
  router.post('/api/getCategories', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
    console.log(req.params)
    const shopID = req.body.shopID;
    console.log(shopID)

    var sqlget = "Select * from Category WHERE shopId=? or shopId is null";
    if(shopID===null || shopID===undefined){
        sqlget = "Select * from Category";
    }
    con.query(sqlget, [shopID], (error, result) => {
        if (!error) {
            console.log("inside categoryList query");
            console.log(result);
            console.log(result.length == 1)
            if (result) {
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




module.exports = router