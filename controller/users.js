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

    const newUser = new User(req.body);
    newUser.password = await User.encryptPassword(newUser.password);
    await newUser.save();

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

// get by Id or Email
const getUserByUidOrEmail = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = validateParams(uid);
    if (!data) return next(400);

    const findParams = await User.findOne(data);
    if (!findParams) return next(404);

    // eslint-disable-next-line no-underscore-dangle
    // eslint-disable-next-line max-len
    if (!isAdmin(req) && req.authToken._id.toString() !== findParams._id.toString()) return next(403);
    res.json(findParams);
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { body } = req;

    const filter = validateParams(uid);
    if (!filter) return next(400);

    const findUid = await User.findOne(filter);
    if (!findUid) return next(404);

    if (body.email && !isValidEmail(body.email)) return next(400);
    if (body.password && isWeakPassword(body.password)) return next(400);

    // eslint-disable-next-line max-len
    if (!isAdmin(req) && req.authToken._id.toString() !== findUid._id.toString()) return next(403);

    if (!isAdmin(req) && body.roles) return next(403);

    if (Object.keys(body).length === 0) return next(400);

    if (body.password) {
      body.password = await User.encryptPassword(body.password);
    }

    // eslint-disable-next-line max-len
    const updateData = await User.findOneAndUpdate(filter, { $set: body }, { new: true, useFindAndModify: false });
    return res.json(updateData);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const data = validateParams(uid);
    if (!data) return next(400);

    const deleteData = await User.findOne(data);
    if (!deleteData) return next(404);

    // eslint-disable-next-line max-len
    if (!isAdmin(req) && req.authToken._id.toString() !== deleteData._id.toString()) return next(403);

    await User.findOneAndDelete(data);
    res.json(deleteData);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  createUsers,
  getUserByUidOrEmail,
  updateUser,
  deleteUser,
};
