const jwt = require('jsonwebtoken');
const config = require('../config');
const {secret} = config;
const User = require('../models/user');

// function signUp (req, resp){
//   const user = new User({
//     email: req.body.email,
//   })

//   user.save(()=>{

//   })
// }

module.exports = {
  singin: async (req, resp, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return next(400);
    };

    // TODO: autenticar a la usuarix
    next();
  }
};
