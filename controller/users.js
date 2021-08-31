const { isAdmin } = require('../middleware/auth');
const User = require('../models/user');
const {
  isValidEmail, isWeakPassword, pagination, validateParams,
} = require('../utils/utils');

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

    if (isWeakPassword(password)) {
      return resp.status(400).json(
        {
          statusCode: 400,
          message: 'your password needs 8 characters',
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
    if (error) next(error);
  }
};

const getUsers = async (req, resp, next) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
    };

    const users = await User.paginate({}, options);
    const url = `${req.protocol}://${req.get('host') + req.path}`;

    const links = pagination(users, url, options.page, options.limit, users.totalPages);

    resp.links(links);
    return resp.json(users.docs);
  } catch (error) {
    resp.next(error);
  }
};
const getUserByUidOrEmail = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = validateParams(uid);

    if (data === undefined) return next(400);
    if (!isAdmin(req)) return next(403);

    const findParams = await User.findOne(data);

    if (!findParams) return next(404);
    res.json(findParams);
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { body } = req;
    console.log(body);
    const filter = validateParams(uid);
    if (filter === undefined) return next(400);
    if (!isAdmin(req)) return next(403);
    const findUid = await User.findOne(filter);
    if (!findUid) return next(404);

    
    

    console.log('update');
    console.log(updateData);
    return res.send(updateData);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  createUsers,
  getUserByUidOrEmail,
  updateUser,
};
