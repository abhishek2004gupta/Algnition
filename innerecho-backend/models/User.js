const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,         // <-- changed from 'name' to 'fullname'
  nickname: String,
  age: Number,
  gender: String,
  occupation: String,
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('User', userSchema);
