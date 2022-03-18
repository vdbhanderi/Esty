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
router.post('/api/removeCart', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    console.log(userId)
    console.log(itemId)

    const sqlget = "delete from FavouriteItems WHERE userId=? and itemId=?";
    con.query(sqlget, [userId, itemId], (error, result) => {
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
FetchCartData = async (cartId) => {
    const sqlget = "Select * from Cart WHERE cartId=?";
    con.query(sqlget, [cartId], (error, result) => {
        if (!error) {
            console.log("inside cart query");
            console.log(result);
            if (result.length != 0) {
                console.log(result);
                return JSON.stringify(result)
            }
            console.log('no Data found')
        } else {
            console.log(error)
        }
    });
}
router.post("/api/addToCart", (req, res) => {
    console.log("inside create shop api", req.body);
    const cartId = req.body.cartId;
    const userId = req.body.userId;
    var item = req.body.item;
    var items;
    const purchaseDate = Date.now();
    const sqlInsert = "INSERT INTO Cart (items,purchaseDate,userId) VALUES (?,?,?)";
    const sqlUpdate = "update Cart set items=?,purchaseDate=? where cartId=? and userId=?";
    if (cartId != null) {
        var cartExistingData = FetchCartData(cartId);
        items = [...cartExistingData, item]
        console.log(items)
        con.query(sqlUpdate, [items, purchaseDate, userId], (err, result) => {
            console.log("inside sql update" + err);
            if (!err) {
                console.log("no Error Insert successfully into Cart");
                console.log(result)
                res.status(200).send();
            } else {
                res.status(500).send('There is some issue please try again!')
            }
        });
    }
    else {
        items = req.body.item;
        con.query(sqlInsert, [items,purchaseDate, userId], (err, result) => {
            console.log("inside sql insert" + err);
            if (!err) {
                console.log("no Error Insert successfully into Cart");
                console.log(result)
                console.log(result.cartId)
                res.status(200).send();
            } else {
                res.status(500).send('There is some issue please try again!')
            }
        });
    }

});

module.exports = router