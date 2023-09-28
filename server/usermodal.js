const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  address:String,
  type:String,
  name:String,
  place:String,
  govtid:String,
  email:String,
  mobilenumber:String,
  other:String
});

module.exports = mongoose.model("user", UserSchema);
