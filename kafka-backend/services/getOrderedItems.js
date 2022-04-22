const Order = require('../models/Order');
const Shop = require('../models/Shop');

const handle_request = async (msg, callback) => {
    console.log("inside the getShopDetails in KAFKA")
    const { userId } = msg;
    console.log(`getShopDetails Id : ${userId}`);
    var items = [];
    Order.find({ userId: userId }, (err, result) => {
        if (!err) {
            console.log(result)
            for (var i = 0; i < result.length; i++) {
                var parsedData = result[i]["items"]
                parsedData.forEach(element => {
                    items.push(element)
                });
                console.log("parsedatasdwfsdfsd", parsedData)
            }
            console.log(items)

            res.status = 200;
            res.data = JSON.stringify(items);
            callback(null, res)
        }
        else {
            res.status = 500;
            callback(null, 'error');
        }
    })

}

exports.handle_request = handle_request;