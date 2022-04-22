const express = require('express')
const con = require('../databse');
const { GETITEM_TOPIC } = require('../kafka/topics');
const router = new express.Router()
var kafka = require("../kafka/client");

router.post('/api/getItem', function (req, res) {
   
    console.log("Inside items by restaurant Post Request");
    console.log("Req Body : ", req.body);

    kafka.make_request(GETITEM_TOPIC, req.body, function (err, results) {
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
    // const sqlget = "Select * from Items WHERE itemId=?";
    // const sqlget2 = "Select * from Shop WHERE shopId=?";
    // con.query(sqlget, [itemId], (error, result) => {
    //     if (!error) {
    //         console.log("inside getItem query");
    //         console.log(result);
    //         var data;
    //         console.log(result.length == 1)
    //         if (result.length == 1) {
    //             con.query(sqlget2, [result[0].shopId], (error, result2) => {
    //                 if (!error) {
    //                     console.log("inside getItem query");
    //                     console.log(result2);
    //                     console.log(result2.length == 1)
    //                     console.log(result);
    //                      data = {
    //                         price: result[0].price,
    //                         shopName: result2[0].shopName,
    //                         shopId: result2[0].shopId,
    //                         itemName: result[0].itemName,
    //                         itemImage: result[0].itemImage,
    //                         itemId: result[0].itemId,
    //                         description: result[0].description,
    //                         totalSale: result[0].totalSale,

    //                     }
    //                     console.log("data",data)
    //                     res.status(200).send(JSON.stringify(data));
    //                     return
    //                 } else {
    //                     console.log(error)
    //                 }

    //             })
                   
    //         }
           

    //     } else {
    //         console.log(error)
    //         res.status(500).send('Something broke!')

    //     }
    // });
});


module.exports = router