//const Shop = require('../models/Shop');
const User = require('../models/User');

const handle_request = async (msg, callback) => {
    console.log("inside the register in KAFKA")
    const { shopId } = msg;
    console.log(`register Id : ${shopId}`);


    await User.find({ email: email }, async (err, result) => {
        console.log("res", result)
        if (err) {
            res.status = 500;
            callback(null, res);
        }
        else if (result.length === 0) {
            console.log("insi")
            const user = new User(req.body);
            const insertResult = await user.save();
            console.log("insert results", insertResult)
            res.status = 200;
            res.data = JSON.stringify(insertResult.insertedId);
            callback(null, res)
        }
        else {
            res.status = 204;
            callback(null, res);
        }
    })
}
exports.handle_request = handle_request;