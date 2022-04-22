const Item = require('../models/item');

const handle_request = async (msg, callback) => {
    console.log("inside the getItemDetails in KAFKA")
    const { itemId } = msg;
    console.log(`getItemDetails Id : ${itemId}`);
    const res = {};


    await Item.find({ _id: msg.itemId })
        .then((result) => {
            console.log(result)
            if (result) {
                res.status = 200;
                    res.data = JSON.stringify(result);
                    callback(null, res)
            }
            else {
                res.status = 404;
                callback(null, res);
            }
        
        }).catch(e => {
            console.log(e)
            res.status = 500;
            callback(null, 'error');
        })
}
exports.handle_request = handle_request;