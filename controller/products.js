const Product = require('../models/product');
const { pagination } = require('../utils/utils');

// get
const getProducts = async (req, resp, next) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
    };

    const allProducts = await Product.paginate({}, options);
    if (!allProducts) return resp.status(404).send({ message: 'There are not products.' });
    const url = `${req.protocol}://${req.get('host') + req.path}`;

    const links = pagination(allProducts, url, options.page, options.limit, allProducts.totalPages);

    resp.links(links);
    resp.json(allProducts.docs);
  } catch (error) {
    return next(error);
  }
};

// get by Id
const getProductId = (req, resp, next) => {
  const { productId } = req.params;
  Product.findById(productId, (err, product) => {
    // console.log('20:', isObjectId(productId));
    if (!product) return resp.status(404).send({ message: 'The product doesn\'t exist.' });
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      resp.status(200).send(product);
    }
  });
};

// post
const createProduct = (req, resp, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    dateEntry: new Date(),
  };
  if (Object.entries(req.body).length === 0) return next(400);
  Product.create(product, (err, productStored) => { // cuando se almacene, mongodb le adiciona un id
    if (err) return next(err);
    resp.status(200).send(productStored);
  });
};

// put
const updateProduct = (req, resp, next) => {
  const { productId } = req.params;
  const bodyUpdated = req.body;
  const { price } = req.body;

  // son 2 argumentos, el 2do es un objeto con los campos que deseo actualizar
  Product.findByIdAndUpdate(productId, bodyUpdated, (err, productUpdated) => {
    if (typeof price !== 'number') return next(400);
    if (err) return resp.status(404).send({ message: `There is a mistake trying to update the product: ${err}` });
    resp.status(200).send(bodyUpdated);
  });
};

// delete
const deleteProduct = async (req, resp, next) => {
  const { productId } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete(productId);
    resp.status(200).send({ message: `The product ${deleted} has been removed succesfully.` });
  } catch (err) {
    if (err) resp.status(404).send({ message: `There is a mistake trying to delete the product: ${err}` });
  }
};

module.exports = {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
};
