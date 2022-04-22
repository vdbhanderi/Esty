const User = require('../models/User');

const handle_request = async (msg, callback) => {
    console.log("inside the getShopName in KAFKA")
    const { shopName } = msg;
    console.log(`getShopName Id : ${shopName}`);
    const res = {};

    Shop.find({ shopName: shopName }, (err, results) => {
        if (!err) {
            console.log(results)
            if (results.length == 0) {
                res.status = 200;
                    //res.data = JSON.stringify(oldfavouriteIds);
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