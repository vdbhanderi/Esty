const Shop = require('../models/Shop');

const handle_request = async (msg, callback) => {
    console.log("inside the getShopDetails in KAFKA")
    const { shopId } = msg;
    console.log(`getShopDetails Id : ${shopId}`);
    const res = {};

    const newShop = new Shop(msg);
    await newShop.save((err, result) => {
        if (!err) {
            console.log(result)
            userData = {
                shopId: result._id,
            };
            if (result) {
                res.status = 200;
                    res.data = JSON.stringify(userData);
                    callback(null, res)
            }
            else {
                res.status = 404;
                callback(null, res);
            }
        }
        else {
            res.status = 500;
            callback(null, 'error');
        }
    })
}
exports.handle_request = handle_request;