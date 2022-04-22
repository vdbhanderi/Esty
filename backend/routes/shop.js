const express = require('express')
const con = require('../databse');
const { GETITEMDETAILS_TOPIC, ADDITEM_TOPIC, UPDATEITEM_TOPIC, GETSHOPNAME_TOPIC, GETSHOPDETAILS_TOPIC, GETITEMLISTBYSHOPID_TOPIC, GETSHOPDETAILSBYUSERID_TOPIC, CREATESHOP_TOPIC, UPDATESHOP_TOPIC, GETCATEGORIES_TOPIC } = require('../kafka/topics');
const router = new express.Router()
var kafka = require("../kafka/client");

router.post('/api/getShopName', function (req, res) {
    console.log("inside the shop Name")
    console.log(req.body)
    console.log("inside getItemDetails")
    console.log(req.body)
  
    kafka.make_request(GETSHOPNAME_TOPIC, req.body, function (err, results) {
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
router.post('/api/getItemListbyShopID', function (req, res) {
    console.log("inside the get Item list by shop Id")
    console.log(req.body)

    kafka.make_request(GETITEMLISTBYSHOPID_TOPIC, req.body, function (err, results) {
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
router.post('/api/getShopDetails', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
  
    kafka.make_request(GETSHOPDETAILS_TOPIC, req.body, function (err, results) {
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
router.post('/api/getShopDetailsbyUserId', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)

    kafka.make_request(GETSHOPDETAILSBYUSERID_TOPIC, req.body, function (err, results) {
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
router.post("/api/createShop", (req, res) => {
    console.log("inside create shop api", req.body);

    kafka.make_request(CREATESHOP_TOPIC, req.body, function (err, results) {
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
router.post("/api/UpdateShop", (req, res) => {
    kafka.make_request(UPDATESHOP_TOPIC, req.body, function (err, results) {
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
router.post('/api/getCategories', function (req, res) {
    console.log("inside the getCategories")
    console.log(req.body)
    kafka.make_request(GETCATEGORIES_TOPIC, req.body, function (err, results) {
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

let addnewCategory = (categoryName, category) => {
    console.log("Entered add new cateogry");
    console.log("Entered function", categoryName);
    console.log(categoryName != '')
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log("Inside the promise");
                if (categoryName !== '') {
                    console.log("inside new category")
                    var sqlInsertForNewCategory = "insert into Category (categoryName) values(?)";
                    con.query(sqlInsertForNewCategory, [categoryName], (err, result) => {
                        console.log("inside sqlinsert for new category" + err);
                        if (!err) {
                            resolve(result.insertId);
                            return
                        }
                        console.log(result)
                        reject("Rejected")
                    })
                }
                else {
                    resolve(category);
                }
            }, 2000
        );
    });
};
router.post("/api/updateItem", (req, res) => {

    console.log("inside getItemDetails")
    console.log(req.body)
  
    kafka.make_request(UPDATEITEM_TOPIC, req.body, function (err, results) {
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

router.post("/api/AddItem", (req, res) => {

    console.log("inside add Item", req.body);
    console.log("inside getItemDetails")
    console.log(req.body)
  
    kafka.make_request(ADDITEM_TOPIC, req.body, function (err, results) {
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
router.post('/api/getItemDetails', function (req, res) {
    console.log("inside getItemDetails")
    console.log(req.body)
  
    kafka.make_request(GETITEMDETAILS_TOPIC, req.body, function (err, results) {
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