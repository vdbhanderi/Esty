const express = require('express')
const { GETORDEREDITEMS_TOPIC } = require('../kafka/topics');
const router = new express.Router()
var kafka = require("../kafka/client");

router.post('/api/getOrderedItems', function (req, res) {
   
    kafka.make_request(GETORDEREDITEMS_TOPIC, req.body, function (err, results) {
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


module.exports = router