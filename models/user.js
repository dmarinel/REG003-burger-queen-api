/* eslint-disable no-return-await */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    maxlength: [100, 'The email can not exceed 100 characters'],
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid e-mail'],
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    admin: { type: Boolean },
  },
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
userSchema.statics.comparePassword = async (password, receivedPassword) => await bcrypt.compare(password, receivedPassword);

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
