const Item = require('../models/item');
const Order = require('../models/Order');

const handle_request = async (msg, callback) => {
    const { userId, cartId } = msg;
    var items = msg.items;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const purchaseDate = today;
    var NewOrder = new Order({
        userId: userId,
        items: items,
        purchaseDate: purchaseDate,
    });

    var data = false
    await updateItems(items).then(() => {
        NewOrder.save((err, result) => {
            if (err) {
                console.log(err)
                res.status(404);
                res.end("Database issues");
            }
            else {
                Cart.findByIdAndRemove(cartId).then(result2 => {
                    data = true
                    console.log("results for insertation", result2);
                    console.log(result)
                    res.status = 200;
                    res.data = JSON.stringify(data);
                    callback(null, res)
                }).catch(err => {
                    console.log("error", err)
                    res.status = 500;
                    res.data = JSON.stringify(data);
                    callback(null, 'Database Issue');
                })
            }
        })
    }).catch((err) => {
        console.log(err)
    })
}
const updateItems = async (items) => {
    // console.log(items)
   await items.forEach(obj => {
        Item.findOne({_id:obj['itemId']},(err,result)=>{
            Item.updateOne({ _id: obj['itemId'] }, { $set: { quantity: (result['quantity'] - obj['quantity']),totalSale: (result['totalSale'] + obj['quantity'])} },(er,re)=>{
                if(er){
                    console.log("reeeeee",er)
                }
            });
        })
    });
}
exports.handle_request = handle_request;
