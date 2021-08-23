/* eslint-disable no-return-await */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: [true, 'Email is required'],
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    admin: { type: Boolean },
  },
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
userSchema.statics.comparePassword = async (password, receivedPassword) => await bcrypt.compare(password, receivedPassword);

module.exports = mongoose.model('User', userSchema);
