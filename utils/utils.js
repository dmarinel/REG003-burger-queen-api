const isValidEmail = (email) => {
  const regExpEmail = /.+\@.+\..+/;
  return regExpEmail.test(email);
};

const isWeakPassword = (password) => {
  // eight characters, at least one letter and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8}$/;
  return passwordRegex.test(password);
};

module.exports = {
  isValidEmail,
  isWeakPassword,
};
