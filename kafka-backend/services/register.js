//const Shop = require('../models/Shop');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const handle_request = async (msg, callback) => {
    console.log("inside the register in KAFKA")
    const { email } = msg;
    console.log(`register Id : ${email}`);
    const res = {};

     User.findOne({ email: email }, async (err, result) => {
        console.log("res", result)
        if (err) {
            res.status = 500;
            callback(null, res);
        }
        else if (!result) {
            console.log("insi")
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(msg.password, salt);
            var user = new User(msg);
            user.password=password
            const insertResult = await user.save();
            var newinsertData={...insertResult,token:"token"}
            console.log("insert results", newinsertData)
            console.log("insert results", insertResult.insertedId)
            res.status = 200;
            res.data = insertResult;
            callback(null, res)
        }
        else {
            res.status = 204;
            callback(null, res);
        }
    }).clone()
}
exports.handle_request = handle_request;