const express = require('express')
const con = require('../databse')
const router = new express.Router()

router.post('/api/getCart', function (req, res) {
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
router.post('/api/checkOut', function (req, res) {
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
router.post("/api/addToCart", (req, res) => {
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

module.exports = router