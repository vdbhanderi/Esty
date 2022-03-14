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
})
module.exports = router