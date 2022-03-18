const express = require('express')
const con = require('../databse')
const router = new express.Router()
router.post('/api/getItemListForDashboard', function (req, res) {
    console.log("inside the get Item list by shop Id")
    console.log(req.body)
    console.log(req.params)
    const shopId = req.body.shopId;
    console.log(shopId)

    const sqlget = "Select * from Items";
    con.query(sqlget, [shopId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            if (result.length != 0) {
                res.status(200).send(JSON.stringify(result));
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end("No items found");
            return

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});
module.exports=router