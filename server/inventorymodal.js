const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  productsavailable:Number,
  reordertype:String,
  recipientaddress:String,
  enterpriseaddress:String,
  enterprisename:String,
  enterprisemail:String,
  date:String,
  triggerlevel:Number,
});

module.exports = mongoose.model("inventory", InventorySchema);
