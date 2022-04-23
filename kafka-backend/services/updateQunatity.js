const Cart = require('../models/cart');

const handle_request = async (msg, callback) => {
    console.log("inside add to cart api", msg);
    const { userId, quantity,itemId } = msg;
    const res = {};

    var existingItems;
    var existingCart = await Cart.findOne({ userId: userId })
    if (existingCart) {
        console.log("inside if")
        existingItems = existingCart.items;
        console.log("existing", existingItems)
        var items;
        if (existingItems.find(x => x.itemId == itemId)) {
            objIndex = existingItems.findIndex((obj => obj.itemId == itemId));
            existingItems[objIndex].quantity = parseInt(quantity);
            items = existingItems;
        }

        console.log("Updated items", items)
    
        Cart.findByIdAndUpdate(existingCart._id, { items: items }, (err, result) => {
            if (err) {
                console.log("error", err)
                res.status = 500;
                callback(null, 'error');
            }
            else {
                console.log(result)
                res.status = 200;
                callback(null, res)
            }
        })
    }

}

exports.handle_request = handle_request;