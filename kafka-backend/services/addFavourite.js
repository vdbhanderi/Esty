const User = require('../models/User');

const handle_request = async (msg, callback) => {
    console.log("inside the add Favourite list by shop Id in KAFKA")
    // const { userId } = msg;
    const res = {};
    const { itemId, userId } = msg;
    console.log(`User Id : ${userId}`);
    console.log(`User Id : ${itemId}`);
    await User.findById(userId, async (err, result) => {

        if (!err) {
            console.log(result)
            var oldfavouriteIds = result.favouriteIds;
            console.log("oldFav", oldfavouriteIds)
            oldfavouriteIds.push(itemId);
            console.log(oldfavouriteIds)

            User.findByIdAndUpdate(userId, { favouriteIds: oldfavouriteIds }, (err, result2) => {
                if (!err) {
                    res.status = 200;
                    res.data = JSON.stringify(oldfavouriteIds);
                    callback(null, res)
                }
                else{
                    res.status = 404;
                    callback(null, res);
                }
            })
        }
        else {
            res.status = 500;
            callback(null, 'error');
        }
    })

}

exports.handle_request = handle_request;