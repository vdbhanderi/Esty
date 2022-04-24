//const Shop = require('../models/Shop');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("../../backend/config.json");

async function handle_request(msg, callback) {
    console.log("Inside login in kafka backend");
    let response = {};
    let err = {};

    try {
        let user = await User.findOne({
            email: msg.email
        });

        if (!user) {
            err.status = 400;
            err.message = "Invalid Email or Password";
            return callback(err, null);
        } else {
            console.log("user",user);

            const validPassword = await bcrypt.compare(msg.password, user.password);
            if (!validPassword) {
                err.status = 400;
                err.message = "Invalid Email or Password";
                return callback(err, null);
            } else {
                let payload = _.pick(user, ["_id", "email"]);

                console.log(payload);
                var token = jwt.sign(payload, config.secretkey, {
                    expiresIn: 1000000 // in seconds
                });

                var userData = {
                    id: user._id,
                    email: user.email,
                    token:"JWT "+token
                  };
                  console.log("response",response)
                response.status = 200;
                response.data = JSON.stringify(userData);
                return callback(null, response);
            }
        }
    } catch (error) {
        console.log(error)
        err.status = 500;
        err.message = "Internal Server Error";
        return callback(err, null);
    }
}
exports.handle_request = handle_request;