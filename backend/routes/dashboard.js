const express = require('express')
const con = require('../databse')
const router = new express.Router()
var kafka = require("../kafka/client");
const { DASHBOARd_TOPIC, GETITEMLISTFORDASHBOARD_TOPIC } = require('../kafka/topics');
// router.post('/api/getItemListForDashboard', function (req, res) {
//     console.log("inside the get Item list by shop Id")
//     console.log(req.body)

//     const sqlget = "select i.*,f.favouriteId,f.userId from Items i left  JOIN FavouriteItems f on  i.itemId=f.itemId ";
//     con.query(sqlget, (error, result) => {
//         if (!error) {
//             console.log("inside itemList query");
//             if (result.length != 0) {
//                 res.status(200).send(JSON.stringify(result));
//                 return
//             }
//             res.writeHead(204, {
//                 "Content-Type": "text/plain",
//             });
//             res.end("No items found");
//             return

//         } else {
//             console.log(error)
//             res.status(500).send('Something broke!')

//         }
//     });
// });
router.post('/api/getItemListForDashboardbySearch', function (req, res) {
    console.log("getItemListForDashboardbySearch")
    console.log(req.body)
    var search=req.body.search;
    const sqlget = "select i.*,f.favouriteId from Items i left  JOIN FavouriteItems f on  i.itemId=f.itemId where i.itemName LIKE '%"+search
    +"%'";
    con.query(sqlget,[search] ,(error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
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

router.post("/api/getItemListForDashboard", (req, res) => {
    console.log("Inside items by restaurant Post Request");
    console.log("Req Body : ", req.body);

    kafka.make_request(GETITEMLISTFORDASHBOARD_TOPIC, req.body, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else");
            console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;