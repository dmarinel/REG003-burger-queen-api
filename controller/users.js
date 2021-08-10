module.exports = {
  getUsers: (req, resp, next) => {
    resp.send('Hello world of users');
  },

  createUsers: (req, resp, next) => {
    const { email, password, roles } = req.body;
    console.log(req.body);
    resp.send('hola me creaste');
    // next();
  },
};
