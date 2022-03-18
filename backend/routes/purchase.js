const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/purchaseList', function (req, res) {
    console.log("inside the purchaseList")
    console.log(req.body)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "Select * from Cart WHERE userId=? and cartId=?";
    con.query(sqlget, [userId,cartId], (error, result) => {
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
            res.end(" there is no items");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')
        }
    });
});

// FetchCartData = async (cartId) => {
//     const sqlget = "Select * from Cart WHERE cartId=?";
//     con.query(sqlget, [cartId], (error, result) => {
//         if (!error) {
//             console.log("inside cart query");
//             console.log(result);
//             if (result.length != 0) {
//                 console.log(result);
//                 return JSON.stringify(result)
//             }
//             console.log('no Data found')
//         } else {
//             console.log(error)
//         }
//     });
// }
router.post("/api/addToCart2", (req, res) => {
    console.log("inside create shop api", req.body);
    const cartId = req.body.cartId;
    const userId = req.body.userId;
    var item = req.body.item;
    var items;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const purchaseDate = today;
    const sqlUpdate = "update Cart set items=?,purchaseDate=? where cartId=? and userId=?";
    if (cartId != null && cartId!='undefined') {
        console.log(cartId)

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
        console.log("inside sql insert");
        items = req.body.item;
        items=JSON.stringify(items)
        console.log(items)
        console.log(purchaseDate)
        const sqlInsert = "insert INTO Cart (items,purchaseDate,userId) VALUES (?,?,?)";
        con.query(sqlInsert, [items, purchaseDate, userId], (err, result) => {
            console.log("inside sql insert" + err);
            if (!err) {
                console.log("no Error Insert successfully into Cart");
                console.log(result.insertId)
                res.status(200).send();
            } else {
                res.status(500).send('There is some issue please try again!')
            }
        });
    }

});

module.exports = router