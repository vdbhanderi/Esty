const Category = require('../models/Category');

const handle_request = async (msg, callback) => {
    console.log("inside the getCategories ")
    const res = {};

    Category.find({},(err,result)=>{
        if (!err) {
            res.status = 200;
            console.log(result)
            res.data = JSON.stringify(result);
            callback(null, res)
        }
        else {
            console.log(err)
            res.status = 404;
            callback(null, res);
        }
    })


}
exports.handle_request = handle_request;
