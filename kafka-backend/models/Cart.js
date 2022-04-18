var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
  },
  items: [{
    itemId: {
        type: String,
    },
    itemName: String,
    itemImage: String,
    shopName: String,
    price: {
        type: Number
      },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.'],
        default: 1
    },
    giftDesc:{
        type: String,
        default: ""
    }
}],
totalamount: {
    type: Number,
    default: 0
},
});

module.exports=Cart=mongoose.model('cart', cartSchema);
   