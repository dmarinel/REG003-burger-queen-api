const User = require('../models/user');

const createUsers = async (req, resp, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(400);

    // find user
    const findUser = await User.findOne({ email });
    if (findUser) return resp.status(403).json({ message: 'User is already registered' });

    const newUser = await new User(req.body);
    newUser.password = await User.encryptPassword(newUser.password);
    newUser.save();

    resp.status(200).send('hola mundo');
  } catch (error) {
    console.log(error);
  }
  // next();
};

const getUsers = async (req, resp, next) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    console.log(limit);
    console.log(req.query);
    resp.status(200).send('hola mundo');
  } catch (error) {

  }
  // next();
};


module.exports = {
  getUsers,
  createUsers,
};
