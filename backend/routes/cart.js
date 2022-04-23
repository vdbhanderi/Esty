const express = require('express')
const con = require('../databse');
const { GETCART_TOPIC, CHECKOUT_TOPIC, ADDTOCART_TOPIC, REMOVEITEMFROMCART_TOPIC, UPDATEQUNATITY_TOPIC } = require('../kafka/topics');
const router = new express.Router()
var kafka = require("../kafka/client");
const { UPDATE_ITEM_FROM_CART } = require('../../frontend/src/redux/Actions/constants');

router.post('/api/getCart1', function (req, res) {
    console.log("inside the cart Name")
    console.log(req.body)
    const userId = req.body.userId;
    const cartId = req.body.cartId;
    console.log(userId)
    console.log(cartId)

    const sqlget = "Select * from Cart WHERE userId=? and cartId=?";
    con.query(sqlget, [userId, cartId], (error, result) => {
        if (!error) {
            console.log("inside get Cart items");
            if (result.length != 0) {
                console.log(result);
                var parsedData = JSON.parse(result[0].items)
                console.log(typeof parsedData)
                // parsedData.forEach(element => {
                //     console.log(element)
                // });
                var data = {
                    items: result[0].items
                }
                res.status(200).send(JSON.stringify(data));
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end(" there is no favourite items");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')
        }
    });
});
router.post("/api/getCart", (req, res) => {
    console.log("get Cart");
    console.log("Req Body : ", req.body);

    kafka.make_request(GETCART_TOPIC, req.body, function (err, results) {
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
router.post('/api/checkOut1', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
    const userId = req.body.userId;
    const cartId = req.body.cartId;
    console.log(userId)
    console.log(cartId)

    const sqlget = "update Cart set status='ordered' WHERE userId=? and cartId=?";
    con.query(sqlget, [userId, cartId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length == 1) {
                console.log(result);
                res.status(200).send();
                return
            }
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.end("delete favourite items");

        } else {
            console.log(error)
            res.status(500).send('Something broke!')

        }
    });
});
router.post("/api/checkOut", (req, res) => {
    console.log("checkOut");
    console.log("Req Body : ", req.body);

    kafka.make_request(CHECKOUT_TOPIC, req.body, function (err, results) {
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
FetchCartData = (cartId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const sqlget = "Select * from Cart WHERE cartId=?";
            console.log("inside fetchcartdata")
            con.query(sqlget, [cartId], (error, result) => {
                if (!error) {
                    console.log("inside FetchCartData");
                    console.log(result);
                    if (result.length != 0) {
                        console.log("result", result);
                        resolve(result[0].items)
                    }
                    //c('no Data found')
                } else {
                    reject(error)
                }
            });
        }, 2000);
    });

}
router.post("/api/addToCart1", (req, res) => {
    console.log("inside create shop api", req.body);
    const cartId = req.body.cartId;
    const userId = req.body.userId;
    var item = req.body.item;
    var items;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const purchaseDate = today;
    var cartExistingData;
    const sqlUpdate = "update Cart set items=?,purchaseDate=? where cartId=? and userId=?";
    if (cartId != null && cartId != 'undefined') {
        console.log(cartId)
        FetchCartData(cartId).then(response => {
            console.log("response parse", JSON.parse(response))
            cartExistingData=JSON.parse(response)
            items = cartExistingData.concat(item)
            console.log("combined Array", items)
            items=JSON.stringify(items)
            console.log("main Array", items)

             con.query(sqlUpdate, [items, purchaseDate, cartId, userId], (err, result) => {
                 console.log("inside sql update " + err);
                 if (!err) {
                     console.log("no Error Insert successfully into Cart");
                     console.log(result)
                     var data = {
                        insertId: cartId
                    }
                    res.status(200).send(JSON.stringify(data));
                 } else {
                     res.status(500).send('There is some issue please try again!')
                 }
             });
        })
       
    } else {
        var array = []
        console.log("inside sql insert");
        items = req.body.item;
        array = JSON.stringify(array.concat(items))
        console.log(array)

        const sqlInsert = "insert INTO Cart (items,purchaseDate,userId) VALUES (?,?,?)";
        con.query(sqlInsert, [array, purchaseDate, userId], (err, result) => {
            console.log("inside sql insert" + err);
            if (!err) {
                console.log("no Error Insert successfully into Cart");
                console.log(result.insertId)
                var data = {
                    insertId: result.insertId
                }
                res.status(200).send(JSON.stringify(data));
            } else {
                res.status(500).send('There is some issue please try again!')
            }
        });
    }

});
router.post("/api/addToCart", async (req, res) => {
    console.log("checkOut");
    console.log("Req Body : ", req.body);

    kafka.make_request(ADDTOCART_TOPIC, req.body, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else");
           // console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});
router.post("/api/removeItemFromCart", async (req, res) => {
    console.log("checkOut");
    console.log("Req Body : ", req.body);

    kafka.make_request(REMOVEITEMFROMCART_TOPIC, req.body, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else");
           // console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});
router.post("/api/updateQunatity", async (req, res) => {
    console.log("updateQunatity");
    console.log("Req Body : ", req.body);

    kafka.make_request(UPDATEQUNATITY_TOPIC, req.body, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else");
           // console.log(results);
            return res.status(results.status).send(results.data);
        }
    });
});
module.exports = router