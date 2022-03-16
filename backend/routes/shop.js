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
});
router.post('/api/getItemListbyShopID', function (req, res) {
    console.log("inside the shop Name")
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.userId;
    console.log(userId)

    const sqlget = "Select * from Items WHERE shopID=?";
    con.query(sqlget, [userId], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length != 0) {
                console.log(result);
                res.status(200).send(JSON.stringify(result));
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
router.post('/api/getShopDetails', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
    console.log(req.params)
    const shopID = req.body.shopID;
    console.log(shopID)

    const sqlget = "Select * from Shop WHERE shopId=?";
    con.query(sqlget, [shopID], (error, result) => {
        if (!error) {
            console.log("inside itemList query");
            console.log(result);
            console.log(result.length == 1)
            if (result.length == 1) {
                console.log(result);
                res.status(200).send(JSON.stringify(result));
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

router.post("/api/createShop", (req, res) => {
    console.log("inside create shop api", req.body);
    const shopName = req.body.shopName;
    const userId = req.body.userId;
    const sqlInsert = "INSERT INTO Shop (shopName,userId) VALUES (?,?)";
    const sqlget2 = "Select * from Shop where shopName=?";
    con.query(sqlInsert, [shopName, userId], (err, result) => {
        console.log("inside sql insert" + err);
        if (!err) {
            console.log("no error create shop query");
            console.log();
            con.query(sqlget2, [shopName], (err, result) => {
                if (!err) {
                    console.log(result)
                    console.log(result.length)
                    if (result.length == 1) {
                        userData = {
                            shopId: result[0].shopId,
                        };
                        res.status(200).send(JSON.stringify(userData));
                    } else {
                        res.writeHead(204, {
                            "Content-Type": "text/plain",
                        });
                        res.end("Duplicate Shop");
                    }
                } else {
                    console.log(err);
                    res.writeHead(204, {
                        "Content-Type": "text/plain",
                    });
                    res.status(404);
                    res.end("Database issues");
                }
            });


        } else {
            res.status(500).send('There is some issue please try again!')
        }
    });
});
router.post('/api/getCategories', function (req, res) {
    console.log("inside the shop deatils")
    console.log(req.body)
    console.log(req.params)
    const shopID = req.body.shopID;
    console.log(shopID)

    var sqlget = "Select * from Category WHERE shopId=? or shopId is null";
    if (shopID === null || shopID === undefined) {
        sqlget = "Select * from Category";
    }
    con.query(sqlget, [shopID], (error, result) => {
        if (!error) {
            console.log("inside categoryList query");
            console.log(result);
            console.log(result.length == 1)
            if (result) {
                res.status(200).send(JSON.stringify(result));
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

function addnewCategory1(categoryName) {
    console.log("inside new category")
    var sqlInsertForNewCategory = "insert into Category (categoryName) values(?)";
    con.query(sqlInsertForNewCategory, [categoryName], (err, result) => {
         console.log(result.insertId)
         console.log("inside sqlinsert for new category" + err);
        if (!err) {
            return 
        }
         console.log(result)
    })
}
let addnewCategory =(categoryName,category)=>{
    console.log("Entered function");
    return new Promise((resolve ,reject)=>{
        setTimeout(
            ()=>{
                console.log("Inside the promise");
                console.log(categoryName!==null)
                if(categoryName!==null){
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
                else{
                    resolve(category);
                }     
            } , 2000
        );
    });
};
  router.post("/api/updateItem", (req, res) => {

    console.log("inside update Item", req.body);
    const itemName = req.body.username;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const itemId = req.body.itemId;
    const price = req.body.price;
    var category = req.body.category;
    const newCat = req.body.newCat;
    const itemImage = req.body.itemImage;
   
    addnewCategory(newCat,category).then((newCategoryId)=>{
        console.log("response",res)
        var sqlUpdate =
        "update items set itemName=? and description=? and quantity=? and price=? and category=? and itemImage=? where itemId=?";
    con.query(sqlUpdate, [itemName, description, quantity, price, newCategoryId, itemImage, itemId], (err, result) => {
        if (!err) {
            console.log(result)
            if (result.length == 1 && req.body.password == result[0].password) {
                userData = {
                 //   id: result[0].id,
                };
                res.status(200).send(JSON.stringify(userData));
            } else {
                res.writeHead(204, {
                    "Content-Type": "text/plain",
                });
                res.end("Invalid credentials");
            }
        } else {
            console.log(err);
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.status(404);
            res.end("Database issues");
        }
    });
    })
   
});
router.post("/api/AddItem", (req, res) => {

    console.log("inside add Item", req.body);
    const itemName = req.body.username;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const shopId = req.body.shopId;
    const price = req.body.price;
    var category = req.body.category;
    const newCat = req.body.newCat;
    const itemImage = req.body.itemImage;

    addnewCategory(newCat,category).then((newCategoryId)=>{
        console.log("response",res)
        var sqlUpdate =
        "insert into Items (itemName, description, quantity, price, category, itemImage,shopId) Values (?,?,?,?,?,?,?)";
    con.query(sqlUpdate, [itemName, description, quantity, price, newCategoryId, itemImage, shopId], (err, result) => {
        if (!err) {
            console.log(result)
            if (result.length == 1 && req.body.password == result[0].password) {
                
                res.status(200).send();
            } else {
                res.writeHead(204, {
                    "Content-Type": "text/plain",
                });
                res.end("Something broken");
            }
        } else {
            console.log(err);
            res.writeHead(204, {
                "Content-Type": "text/plain",
            });
            res.status(404);
            res.end("Database issues");
        }
    });
    })
   
});


module.exports = router