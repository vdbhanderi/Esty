const express = require('express')
const con = require('../databse');
const { ADDFAVOURITE_TOPIC, REMOVEFAVOURITE_TOPIC } = require('../kafka/topics');
const router = new express.Router()
var kafka = require("../kafka/client");

router.post('/api/getFavouriteItemsbyUserID', function (req, res) {
    console.log("inside the FavouriteItems Name")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "select i.*,f.favouriteId from Items i JOIN FavouriteItems f on i.itemId=f.itemId and f.userId=?";
    con.query(sqlget, [userId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            if (result.length != 0) {
                console.log(result);
                res.status(200).send(JSON.stringify(result));
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end(" there is no favourite items");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});
router.post('/api/removeFavourite1', function (req, res) {
    console.log("remove favourite")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    console.log(userId)
    console.log(itemId)

 const sqlget = "delete from FavouriteItems WHERE userId=? and itemId=?";
    con.query(sqlget, [userId,itemId], (error, result) => {
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
            res.end("delete favourite items");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});
router.post("/api/removeFavourite", (req, res) => {
    console.log("removeFavourite");
    console.log("Req Body : ", req.body);

    kafka.make_request(REMOVEFAVOURITE_TOPIC, req.body, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else");
          //  console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});
router.post("/api/addFavourite1", (req, res) => {
    console.log("inside add favourite", req.body);
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    const sqlInsert = "INSERT INTO FavouriteItems (itemId,userId) VALUES (?,?)";
    con.query(sqlInsert, [itemId, userId], (err, result) => {
        console.log("inside sql insert" + err);
        if (!err) {
            console.log("no error create shop query");
            console.log(result)
            console.log(result.length)  
                res.status(200).send();
        } else {
            res.status(500).send('There is some issue please try again!')
        }
    });
});

router.post("/api/addFavourite", (req, res) => {
    console.log("addFavourite");
    console.log("Req Body : ", req.body);

    kafka.make_request(ADDFAVOURITE_TOPIC, req.body, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else");
          //  console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});
module.exports = router