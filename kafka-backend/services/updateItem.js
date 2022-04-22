const Category = require('../models/Category');
const item = require('../models/item');

const handle_request = async (msg, callback) => {
    const res = {};
    console.log("inside update Item", msg);
    const itemName = msg.itemName;
    const description = msg.description;
    const quantity = msg.quantity;
    const itemId = msg._id;
    const price = msg.price;
    var category = msg.category;
    const newCat = msg.newCat;
    const itemImage = msg.itemImage;
    console.log(msg._id)
    if (newCat) {
        console.log("inside if")
        var newCategory = new Category({ categoryName: newCat });
        newCategory.save((err, result1) => {
            if (!err) {
                console.log(result1)
                category = result1._id
                item.findByIdAndUpdate(itemId, { itemName: itemName, description: description, quantity: quantity, price: price, category: category, itemImage: itemImage }, (err, result) => {
                    if (!err) {
                        console.log(result)
                        res.status = 200;
                        callback(null, res)
                    }
                    else {
                        console.log(err)
                        res.status = 404;
                        callback(null, 'Database Issue');
                    }
                })
            }
        })
    }
    else {
        item.findByIdAndUpdate(itemId, { itemName: itemName, description: description, quantity: quantity, price: price, category: category, itemImage: itemImage }, (err, result) => {
            if (!err) {
                console.log(result)
                res.status = 200;
                callback(null, res)
            }
            else {
                console.log(err)
                res.status = 404;
                callback(null, 'Database Issue');
            }
        })
    }
}

exports.handle_request = handle_request;
