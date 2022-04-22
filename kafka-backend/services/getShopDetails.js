const Shop = require('../models/Shop');

const handle_request = async (msg, callback) => {
    console.log("inside the getShopDetails in KAFKA")
    const { shopId } = msg;
    console.log(`getShopDetails Id : ${shopId}`);

    Shop.findById(shopId, (err, results) => {
        if (!err) {
            console.log(results)
            if (results) {
                res.status = 200;
                    res.data = JSON.stringify(results);
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
    }).clone()
}
exports.handle_request = handle_request;