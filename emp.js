const mongoose = require("mongoose");

const schema = mongoose.Schema({
  emp_id: String,
  name: String,
  email: String,
  phone_no: Number,
  gender: String,
  age:Number,
  password: String,
  branch: String,
  designation:String,
  experience: String,
  salary:Number
});

const empModal = mongoose.model("employee", schema);

module.exports = empModal;
