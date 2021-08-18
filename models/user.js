const { Schema, model } = require('mongoose');
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

// fx que pre salva en la bd el objeto
// hashea o encripta la contraseña antes de guardarla
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.encryptPassword = async (password) => {
  // cuantas veces quiero aplicar el algoritmo: 10 veces
  // termina de aplicar el método y me devuelve un salt 
  const salt = await bcrypt.genSalt(10);
  // convertir el string del password y lo encripta
  return bcrypt.hash(password, salt);
}

module.exports = model('User', userSchema);
