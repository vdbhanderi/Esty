const Cart = require('../models/cart');

const handle_request = async (msg, callback) => {
    console.log("inside add to cart api", msg);
    const { userId, cartId } = msg;
    var newitem = msg.item;
    const res = {};

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const purchaseDate = today;
    var item = {
        itemId: newitem.itemId,
        itemName: newitem.itemName,
        itemImage: newitem.itemImage,
        shopName: newitem.shopName,
        price: newitem.price,
        quantity: newitem.quantity
    };
    console.log("inside sql add to cart", item);
    var existingItems;
    var totalamount = newitem.price * parseInt(newitem.quantity);
    var existingCart = await Cart.findOne({ userId: msg.userId })
    if (existingCart) {
        console.log("inside else")
        existingItems = existingCart.items;
        console.log("existing", existingItems)
        var items;
        if (existingItems.find(x => x.itemId == newitem.itemId)) {
            objIndex = existingItems.findIndex((obj => obj.itemId == newitem.itemId));
            existingItems[objIndex].quantity += parseInt(newitem.quantity);
            items = existingItems;
        }
        else {
            items = existingItems;
            items.push({
                itemId: newitem.itemId,
                itemName: newitem.itemName,
                itemImage: newitem.itemImage,
                shopName: newitem.shopName,
                price: newitem.price,
                quantity: newitem.quantity
            });
        }
        console.log("Updated items", items)
        totalamount = 0;
        items.forEach(i => {
            totalamount += (i.price * i.quantity)
        });
    }

    var NewCart = new Cart({
        userId: userId,
        items: [item],
        totalamount: totalamount,
    });
    if (!existingCart) {
        NewCart.save((err, result) => {
            if (err) {
                console.log(err)
                res.status = 500;
                callback(null, 'error');
            }
            else {
                var data = {
                    insertId: result.insertedId
                }
                console.log(result)
                res.status = 200;
                res.data = JSON.stringify(data);
                callback(null, res)
            }
        })
    }
    else {
        Cart.findByIdAndUpdate(cartId, { items: items, totalamount: totalamount }, (err, result) => {
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