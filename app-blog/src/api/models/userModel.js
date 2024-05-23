const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save',function(next){
  this.password=bcrypt.hash(this.password,10);
  next();
});


module.exports = mongoose.model('User', userSchema);