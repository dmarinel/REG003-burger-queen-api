/* eslint-disable no-return-await */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
<<<<<<< HEAD
    maxlength: [100, 'The email can not exceed 100 characters'],
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid e-mail'],
    required: [true, 'Email is required'],
=======
    lowercase: true,
    require: [true, 'Email is required.'],
    match: [/.+\@.+\..+/, 'Please, write a valid email.']
>>>>>>> 96439dc80f1d15e02f4b0ab355fc97d9dc87e011
  },
  password: {
    type: String,
    require: [true, 'Password is required.'],
  },
  roles: {
    admin: { type: Boolean },
  },
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.pre('save', async function (next) {
  const user = this;
  if(!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10, (err, passwordHash) => {
    err & next(err)
    user.password = passwordHash;
    next()
  })
})


userSchema.statics.encryptPassword = async (password) => {
  // cuantas veces quiero aplicar el algoritmo: 10 veces
  // termina de aplicar el método y me devuelve un salt 
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
userSchema.statics.comparePassword = async (password, receivedPassword) => await bcrypt.compare(password, receivedPassword);

<<<<<<< HEAD
userSchema.plugin(mongoosePaginate);
=======
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
>>>>>>> 96439dc80f1d15e02f4b0ab355fc97d9dc87e011

module.exports = mongoose.model('User', userSchema);
