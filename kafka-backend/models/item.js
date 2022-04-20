var mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  //itemId: String,
  
  itemName: {
    type: String
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
    default: 1
},
  price: {
    type: Number
  },
  totalSale: {
    type: Number
  },
  itemImage: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId
  },
  currency: {
    type: String
  },
  
}, { versionKey: false });

const item = mongoose.model('item', itemSchema);
module.exports = item;