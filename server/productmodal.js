const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name:String,
  price:String,
  quantity:String,
  pickup:String,
  destination:String,
  recipientaddress:String,
  enterpriseaddress:String,
  deliverydate:String,
  delivered:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("product", ProductSchema);
