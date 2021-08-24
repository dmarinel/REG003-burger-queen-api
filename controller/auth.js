const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');

const { secret } = config;

const signIn = async (req, resp, next) => {
  //console.log('req', JSON.stringify(req.body));
  // const body = req.body
  const { email, password } = req.body;
  if (!email || !password) {
    return next(400);
  }

  // TO DO: autenticar a la usuarix
  try {
    const userEmail = await User.findOne({
      email: req.body.email,
    });

    if (!userEmail) {
      return resp.status(400).json({
        message: 'This user does not exist!',
      });
    }
    const validPassword = await bcrypt.compare(password, userEmail.password);

    if (!validPassword) return resp.status(400).json({ message: 'Invalid Email or Password.' });

    // Create a new token with email in the payload
    jwt.sign({
        // eslint-disable-next-line no-underscore-dangle
        uid: userEmail._id,
        email: userEmail.email,
        roles: userEmail.roles,
        }, secret, {
          algorithm: 'HS256',
          expiresIn: 3000,
        }, (err, token) => {
      console.log('auth controller:', err, token);
      if (err) console.error(err);

      return resp.status(200).json({ token });
    });
  } catch (error) {
    console.log(error);
  }

  // next();
};

module.exports = {
  signIn,
};
