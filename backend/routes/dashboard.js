const express = require('express')
const con = require('../databse')
const router = new express.Router()
router.post('/api/getItemListForDashboard', function (req, res) {
    console.log("inside the get Item list by shop Id")
    console.log(req.body)

    const sqlget = "select i.*,f.favouriteId from Items i left  JOIN FavouriteItems f on  i.itemId=f.itemId ";
    con.query(sqlget, (error, result) => {
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