const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

const { secret } = config;

const singin = async (req, resp, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(400);
  }

  try {
    const userEmail = await User.findOne({
      email,
    });
    console.log(userEmail);
    console.log(password);
    if (!userEmail) {
      return resp.status(400).json({
        message: 'This user does not exist!',
      });
    }

    const validPassword = await bcrypt.compare(password, userEmail.password);
    if (!validPassword) return resp.status(400).json({ message: 'Invalid Email or Password.' });
    // await bcrypt.compare(password, userEmail.password, (err, data) => {
    //   // if (err) console.log(err);
    //   console.log(typeof password, typeof userEmail.password);
    //   if (!data) {
    //     return resp.status(404).json({ message: 'holalallal' });
    //     // console.log(`hola mundo`);
    //   }
    // });
  } catch (error) {
    console.log('line35');
    console.log(error);
  }

  // // TODO: autenticar a la usuarix
  // return 1;
  next();
};

module.exports = {
  singin,
};
