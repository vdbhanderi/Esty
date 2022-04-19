var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    giftDesc: {
      type: String,
      default: ""
    },
    itemPurchaseDate: {
      type: Date,
      default: ""
    }
  }],
  purchaseDate: Date
});

module.exports = Cart = mongoose.model('order', orderSchema);
