const getUsers = (req, resp, next) => {
  resp.send('get all users');
  next();
};

const createUsers = (req, resp, next) => {
  resp.send('create new users');
  next();
};

module.exports = {
  getUsers,
  createUsers,
};

// const User = require('../models/user');

// const getUsers = (req, resp, next) => {
//   resp.send('holi');
//   resp.status(404).send('Sorry cant find that!');
// };

// // post
// const createUser = (req, resp, next) => {
//   console.log('POST USER');
//   console.log(req.body);

//   const product = new Product();
//   product.name = req.body.name;
//   product.price = req.body.price;
//   product.image = req.body.image;
//   product.type = req.body.type;
//   product.dateEntry = req.body.type;

//   product.save((err, productStored) => { // cuando se almacene, mongodb le adiciona un id
// if (err) resp.status(500).send({ message: `Oppss.There is an error in the data base: ${err}` });
//     else { res.status(200).send({ product: productStored }); }
//   });
// };

// module.exports = {
//   getUsers,
//   createUser,
// };
