const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  enterpriseaddress:String,
  recipientaddress:String,
  enterprisename:String,
});

module.exports = mongoose.model("reward", RewardSchema);
