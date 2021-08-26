const User = require('../models/user');
const { isValidEmail, isWeakPassword } = require('../utils/utils');

const createUsers = async (req, resp, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(400);
    if (!isValidEmail(email)) {
      return resp.status(400).json(
        {
          statusCode: 400,
          message: 'Please insert a valid email address',
        },
      );
    }
    if (!isWeakPassword(password)) {
      return resp.status(400).json(
        {
          statusCode: 400,
          message: 'your password needs 8 characters, at least one lowercase letter and one number',
        },
      );
    }

    // find user
    const findUser = await User.findOne({ email });
    if (findUser) return resp.status(403).json({ message: 'User is already registered' });

    const newUser = await new User(req.body);
    newUser.password = await User.encryptPassword(newUser.password);
    newUser.save();

    return resp.json(newUser);
  } catch (error) {
    if (error) next(500);
  }
};

const getUsers = async (req, resp, next) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    console.log(limit);
    console.log(req.query);
    resp.status(200).send('hola mundo');
  } catch (error) {
    return next(500);
  }
  // next();
};

module.exports = {
  getUsers,
  createUsers,
};

