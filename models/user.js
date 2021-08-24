/* eslint-disable no-return-await */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: [true, 'Email is required.'],
    match: [/.+\@.+\..+/, 'Please, write a valid email.']
  },
  password: {
    type: String,
    require: [true, 'Password is required.'],
  },
  roles: {
    admin: { type: Boolean },
  },
});

userSchema.statics.encryptPassword = async (password) => {
  // cuantas veces quiero aplicar el algoritmo: 10 veces
  // termina de aplicar el método y me devuelve un salt 
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
userSchema.statics.comparePassword = async (password, receivedPassword) => await bcrypt.compare(password, receivedPassword);

// elimina la key password del objeto que retorna al momento de crear un usuario
userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

// y por último, agregamos el plugin de validación única y exportamos el modelo recién creado
userSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('User', userSchema);
