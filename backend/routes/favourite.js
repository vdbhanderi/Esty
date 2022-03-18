const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/getFavouriteItemsbyUserID', function (req, res) {
    console.log("inside the FavouriteItems Name")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "Select * from FavouriteItems WHERE userId=?";
    con.query(sqlget, [userId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
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
router.post('/api/removeFavourite', function (req, res) {
    console.log("inside the shop deatils")
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

router.post("/api/insertFavourite", (req, res) => {
    console.log("inside create shop api", req.body);
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    const sqlInsert = "INSERT INTO FavouriteItems (itemId,userId) VALUES (?,?)";
    con.query(sqlInsert, [itemId, userId], (err, result) => {
        console.log("inside sql insert" + err);
        if (!err) {
            console.log("no error create shop query");
            console.log(result)
            console.log(result.length)  
                res.status(200).send(JSON.stringify(userData));
        } else {
            res.status(500).send('There is some issue please try again!')
        }
    });
});

module.exports = router