var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ShopSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  shopName: {
    type: String
  },
  shopAddress: {
    type: String,
    default: ""
  },
  shopDescription: {
    type: String,
    default: ""
  },
  shopEmail: {
    type: String,
    default: ""
  },
  shopPhone: {
    type: String,
    default: "1234567890"
  },
  shopImage: {
    type: String,
    default: ""
  }
 
});

exports.Shop = mongoose.model('Shop', ShopSchema);
exports.ShopSchema = ShopSchema;