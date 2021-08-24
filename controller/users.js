const config = require('../config');
const User = require('../models/user');

const getUsers = (req, resp, next) => {
  resp.send('get all users');
  // next();
};

const createUsers = (req, resp, next) => {
  
  const body = req.body;
  if (!email || !password) {
    return next(400);
  }
  console.log('user controller linea 15');
  let usuario = new Usuario({
    email,
    password: bcrypt.hashSync(password, 10),
    roles
  });
  usuario.save((err, usuarioDB) => {
    console.log('aquí 19');
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          usuario: usuarioDB
       });
    })

  resp.send('create new users');
  next();
};


module.exports = {
  getUsers,
  createUsers,
};
