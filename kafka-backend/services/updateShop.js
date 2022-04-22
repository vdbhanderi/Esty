const Shop = require('../models/Shop');

const handle_request = async (msg, callback) => {
    console.log("inside update shop api", msg);
    const { shopName, shopImage } = msg;
    console.log(`getShopDetails Id : ${shopName}`);
    const res = {};

    Shop.findOneAndUpdate({ shopName: shopName }, { shopImage: shopImage },
        function (err, result) {
            if (err) {
                console.log(err)
                res.status = 500;
                callback(null, 'error');
            }
            else {
                console.log("Updated Shop : ", result);
                userData = {
                    isShopUpdated: true,
                };
                res.status = 200;
                res.data = JSON.stringify(userData);
                callback(null, res)
            }
        });
}
exports.handle_request = handle_request;