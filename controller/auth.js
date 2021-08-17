const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/user');
const { secret } = config;

const signIn = async (req, resp, next) => {
  console.log('texto:', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(400);
  }
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
    
    resp.status(200).json({ message: 'Email & password are valid.' })
  } catch (error) {
    console.log(error);
  }
  
  // TO DO: autenticar a la usuarix
  // next();
};

module.exports = {
  signIn,
};


// function signUp (req, resp){
//   const user = new User({
//     email: req.body.email,
//   })

//   user.save(()=>{

//   })
// }