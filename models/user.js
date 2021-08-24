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
  },
  password: {
    type: String,
    require: [true, 'Password is required.'],
  },
  roles: {
    admin: { type: Boolean },
  },
});
//------- Chio
// userSchema.pre('save', function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

<<<<<<< HEAD
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   });
// });

// // Encriptar contraseña cuando sea actualizado
// userSchema.pre('findOneAndUpdate', function (next) {
//   const user = this;
//   if (!user._update.$set.password) return next();
//   bcrypt.hash(user._update.$set.password, 10, (err, passwordHash) => {
//     if (err) return next(err);
//     user._update.$set.password = passwordHash;
//     next();
//   });
// });
//------------------------
// fx que pre salva en la bd el objeto
// hashea o encripta la contraseña antes de guardarla
// userSchema.pre('save', function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, null, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

// el método de encriptación traído de un video
userSchema.methods.encryptPassword = async (password) => {
  // cuantas veces quiero aplicar el algoritmo: 10 veces
  // termina de aplicar el método y me devuelve un salt 
=======
userSchema.statics.encryptPassword = async (password) => {
>>>>>>> 5b638bc70ea216cb1b786cd3847984497e83b40a
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
userSchema.statics.comparePassword = async (password, receivedPassword) => await bcrypt.compare(password, receivedPassword);

<<<<<<< HEAD

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



module.exports = model('User', userSchema);
=======
module.exports = mongoose.model('User', userSchema);
>>>>>>> 5b638bc70ea216cb1b786cd3847984497e83b40a
