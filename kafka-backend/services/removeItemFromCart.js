const cart = require('../models/cart');


const handle_request = async (msg, callback) => {
    console.log("inside the remove cart item by cart Id in KAFKA")
    const { itemId, userId } = msg;
    console.log(`User Id : ${userId}`);
    console.log(`item Id : ${itemId}`);
    cart.findOne({userId:userId},async(err,result)=>{
        const res = {}; 
        if(!err){
            var existingItems=result.items;
            console.log("oldFav",existingItems)
            var newItems=existingItems.filter(x=>x.itemId!=itemId);
            console.log(newItems)
            console.log(newItems.length > 0)
            var totalamount=0;
            if(newItems.length > 0){
                newItems.forEach(i => {
                    totalamount += (i.price * i.quantity)
                });
                cart.findByIdAndUpdate(result._id,{items:newItems,totalamount:totalamount},(err,result2)=>{
                    if(!err){
                        data = {
                            cartId: result._id,
                            items: newItems
                        }
                        console.log("updated result")
                        res.status = 200;
                        res.data = JSON.stringify(data);
                        callback(null, res)
                    }
                    else{
                        res.status = 404;
                        callback(null, res);
                    }
                })
            }
            else{
                cart.findByIdAndRemove(result._id,(err,result2)=>{
                    if(!err){
                        res.status = 200;
                        console.log(result2)
                        //res.data = JSON.stringify(oldfavouriteIds);
                        callback(null, res)
                    }
                    else{
                        res.status = 404;
                        callback(null, res);
                    }
                })

            }
            
        }
        else{
            console.log(err)
            res.status = 500;
            callback(null, 'error');
        }
    })
}
exports.handle_request = handle_request;