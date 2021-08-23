const { Schema, model } = require('mongoose');
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
  const salt = await bcrypt.genSalt(10);
  // convertir el string del password y lo encripta
  return bcrypt.hash(password, salt);
}


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
