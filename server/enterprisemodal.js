const mongoose = require("mongoose");

const EnterpriseSchema = new mongoose.Schema({
  name:String,
  title:String,
});

module.exports = mongoose.model("recipient", EnterpriseSchema);
