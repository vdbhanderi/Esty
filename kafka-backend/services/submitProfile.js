const User = require('../models/User');

const handle_request = async (msg, callback) => {
    console.log("inside update shop api", msg);
    const res = {};

    //const { phone, firstName,state } = msg;
    const phone = msg.phone;
    const firstName = msg.firstName;
    const state = msg.state;
    const country = msg.country;
    const gender = msg.gender;
    const email = msg.email;
    const zip = msg.zip;
    const dob = msg.dob;
    const address = msg.address;
    const userId = msg.userId;
    const city = msg.city;
    const userImage = msg.userImage;
    const userName = msg.username;
    User.findByIdAndUpdate( userId, { phone: phone,firstName:firstName,country:country,zip:zip,state:state,address:address,dob:dob,userImage:userImage,city:city,email:email,gender:gender,userName:userName },
        function (err, result) {
            if (err) {
                console.log(err)
                res.status = 500;
                callback(null, 'error');
            }
            else {
                console.log("Updated Shop : ", result);
                userData = {
                    isUserUpdated: true,
                };
                res.status = 200;
                res.data = JSON.stringify(userData);
                callback(null, res)
            }
        });
}
exports.handle_request = handle_request;