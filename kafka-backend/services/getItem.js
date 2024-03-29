const item = require('../models/item');

const handle_request = async (msg, callback) => {
    console.log("inside the getItem in KAFKA")
    const res = {};

    const { itemId } = msg;
    console.log(`getItem Id : ${itemId}`);
    await item.findById(itemId)
        .then((result) => {
            console.log("results",result)
            if (result) {
                res.status = 200;
                res.data = JSON.stringify(result);
                callback(null, res)
            }
            res.status = 404;
            callback(null, res);
        }).catch(e => {
            res.status = 500;
            callback(null, 'error');
        })

}
exports.handle_request = handle_request;