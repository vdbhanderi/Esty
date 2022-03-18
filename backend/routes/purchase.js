const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/getOrderedItems', function (req, res) {
    console.log("inside the purchaseList")
    console.log(req.body)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "Select * from Cart WHERE userId=? and status='ordered'";
    con.query(sqlget, [userId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            var array = [];
            console.log(result.length)
            for (var i = 0; i < result.length; i++) {
                var parsedData = JSON.parse(result[i].items)
                var purchaseDate = result[i].purchaseDate
                console.log("parsedata", parsedData)
                parsedData.forEach(element => {

                    var item = {
                        price: element.price,
                        quantity: element.quantity,
                        itemImage: element.itemImage,
                        itemName: element.itemName,
                        shopName: element.shopName,
                        purchaseDate: purchaseDate,
                    }
                     console.log(item)
                    array=array.concat(item)
                });
                //array
            }

            console.log("arra",array);
            if (result.length != 0) {
                res.status(200).send(JSON.stringify(array));
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


module.exports = router