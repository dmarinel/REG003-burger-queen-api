const jwt = require('jsonwebtoken');
const config = require('../config');
const {secret} = config;

module.exports = {
  singin: async (req, resp, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return next(400);
    };

    // // TODO: autenticar a la usuarix
    next();
  }
};
