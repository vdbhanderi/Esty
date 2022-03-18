const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/getItem', function (req, res) {
    console.log("inside the get Item")
    console.log(req.body)
    const itemId = parseInt(req.body.itemid);
    console.log(itemId)

    const sqlget = "Select * from Items WHERE itemId=?";
    con.query(sqlget, [itemId], (error, result) => {
        if (!error) {
            console.log("inside login query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length == 1) {
                console.log(result);
                res.status(200).send(JSON.stringify(result[0]));
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