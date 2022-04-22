const cart = require('../models/cart');

const handle_request = async (msg, callback) => {
    console.log("inside the getCart in KAFKA")
    const { userId } = msg;
    console.log(`getItem Id : ${userId}`);
    const res = {};

    var data = {}
    await cart.findOne({ userId: userId }, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send("Something is broken")
        }
        else {
            if (result) {
                data = {
                    cartId: result._id,
                    items: result.items
                }
                res.status = 200;
                res.data = JSON.stringify(data);
                callback(null, res)
            }
            else {
                res.status = 404;
                callback(null, res);
            }
        }
    }).clone()

}
exports.handle_request = handle_request;