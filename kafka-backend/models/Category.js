const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  }
);

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;