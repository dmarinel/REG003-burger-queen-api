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
