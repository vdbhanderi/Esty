const User = require('../models/User');

const handle_request = async (msg, callback) => {
    console.log("inside the getItem in KAFKA")
    const { userId } = msg;
    console.log(`getItem Id : ${userId}`);
    const res = {};

    console.log(msg)
    await User.findById(userId).then(result => {
        console.log("result", result)
        if (result) {
            res.status = 200;
            res.data = JSON.stringify(result);
            callback(null, res)
        }
        else {
            res.status = 404;
            callback(null, res)
        }
    }).catch(err => {
        console.log("error", err)
        res.status = 500;
        callback(null, res)
    })
}
exports.handle_request = handle_request;