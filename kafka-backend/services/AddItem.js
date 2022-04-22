const Category = require('../models/Category');
const item = require('../models/item');

const handle_request = async (msg, callback) => {
    const res = {};

    console.log("inside add Item", msg);
    const itemName = msg.itemName;
    const description = msg.description;
    const quantity = msg.quantity;
    const shopId = msg.shopId;
    const price = msg.price;
    var category = msg.category;
    const newCat = msg.newCat;
    const itemImage = msg.itemImage;
    if (newCat) {
        console.log("inside if")
        var newCategory = new Category({ categoryName: newCat });
        newCategory.save((err, result1) => {
            if (!err) {
                console.log(result1)
                category = result1._id
                var newItem = new item({
                    itemImage: itemImage,
                    description: description,
                    quantity: quantity,
                    shopId: shopId,
                    price: price,
                    category: category,
                    itemName: itemName
                })
                newItem.save((err, result) => {
                    if (!err) {
                        console.log(result)
                        res.status = 200;
                    ///res.data = JSON.stringify(oldfavouriteIds);
                    callback(null, res)
                    }
                    else {
                        console.log(err)
                        res.status(404);
                        res.end("Database issues");
                    }
                })
            }
            else{
                res.status = 404;
                callback(null, 'Database Issue');
            }
        })

    }
    else {
        console.log("inside else")
        var newItem = new item({
            itemImage: itemImage,
            description: description,
            quantity: quantity,
            shopId: shopId,
            price: price,
            category: category,
            itemName: itemName
        })
        newItem.save((err, result) => {
            if (!err) {
                console.log(result)
                res.status = 200;
                callback(null, res)
            }
            else {
                console.log(err)
                res.status = 500;
                callback(null, 'error');
               
            }
        })
    }

}

exports.handle_request = handle_request;
