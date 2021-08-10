const { Schema, model } = require("mongoose");

const userShema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    admin: {
      type: Boolean,
    },
  },
});

module.exports = model(userShema);
