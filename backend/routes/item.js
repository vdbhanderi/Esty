const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/getItem', function (req, res) {
    console.log("inside the get Item")
    console.log(req.body)
    const itemId = parseInt(req.body.itemid);
    console.log(itemId)

    const sqlget = "Select * from Items WHERE itemId=?";
    const sqlget2 = "Select * from Shop WHERE shopId=?";
    con.query(sqlget, [itemId], (error, result) => {
        if (!error) {
            console.log("inside login query");
            console.log(result);
            var data;
            console.log(result.length == 1)
            if (result.length == 1) {
                con.query(sqlget2, [result[0].shopId], (error, result2) => {
                    if (!error) {
                        console.log("inside login query");
                        console.log(result2);
                        console.log(result2.length == 1)
                        console.log(result);
                         data = {
                            price: result[0].price,
                            shopName: result2[0].shopName,
                            itemName: result[0].itemName,
                            itemImage: result[0].itemImage,
                            itemId: result[0].itemId,
                            description: result[0].description,
                            totalSale: result[0].totalSale,

                        }
                        console.log("data",data)
                        res.status(200).send(JSON.stringify(data));
                        return
                    } else {
                        console.log(error)
                    }

                })
                   
            }
           

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});


module.exports = router