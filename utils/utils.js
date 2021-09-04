const isValidEmail = (email) => {
  const regExpEmail = /.+\@.+\..+/;
  return regExpEmail.test(email);
};

const isWeakPassword = (password) => (password.length <= 3);
// eight characters, at least one letter and one number
// const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8}$/;
// return passwordRegex.test(password);

const pagination = (getUser, url, page, limit, totalPages) => {
  const linkHeader = {
    first: `${url}?limit=${limit}&page=1`,
    prev: getUser.hasPrevPage ? `${url}?limit=${limit}&page=${page - 1}` : `${url}?limit=${limit}&page=${page}`,
    next: getUser.hasNextPage ? `${url}?limit=${limit}&page=${page + 1}` : `${url}?limit=${limit}&page=${page}`,
    last: `${url}?limit=${limit}&page=${totalPages}`,
  };
  return linkHeader;
};

const validateParams = (params) => {
  const regExpUidMongo = new RegExp('^[0-9a-fA-F]{24}$');
  const isValidUid = regExpUidMongo.test(params);

  if (isValidUid) {
    return { _id: params };
  } if (isValidEmail(params)) {
    return { email: params };
  }
  return false;
};

module.exports = {
  isValidEmail,
  isWeakPassword,
  pagination,
  validateParams,
};
