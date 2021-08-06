const User = require('../models/user')

const getUsers = (req, resp, next) => {
  resp.status(200)
}

module.exports = {
  getUsers,
};
