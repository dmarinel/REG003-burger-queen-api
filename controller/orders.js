const Order = require('../models/order');
const { validateParams, pagination } = require('../utils/utils');

// get
const getOrders = async (req, resp, next) => {
  try {
    const options = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 10,
    };

    const allOrders = await Order.paginate({}, options);
    if (!allOrders) return resp.status(404).send({ message: 'There are not products.' });
    const url = `${req.protocol}://${req.get('host') + req.path}`;

    const links = pagination(allOrders, url, options.page, options.limit, allOrders.totalPages);

    resp.links(links);
    resp.json(allOrders.docs);
  } catch (error) {
    return next(error);
  }
};

// get by Order
const getOrderId = async (req, resp, next) => {
  const { orderId } = req.params;

  try {
    if (!validateParams(orderId)) {
      return resp.status(404).send({ message: 'The product doesn\'t exist.' });
    }
    const oneOrder = await Order.findById(orderId).populate('products.product');
    if (!oneOrder) return next(404);
    return resp.status(200).send(oneOrder);
  } catch (error) {
    // console.log('26:',err); // ¡Si quiero saber el error, console!
    next(error);
  }
};

// post
const createOrder = async (req, resp, next) => {
  // 1hora:09 min video: https://www.youtube.com/watch?v=-bI0diefasA
  const {
    userId,
    client,
    products,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0 || req.body.products.length === 0) return next(400);
    // 1hora:22 min video: https://www.youtube.com/watch?v=-bI0diefasA

    const newOrder = new Order({
      userId,
      client,
      products: products.map((product) => ({
        qty: product.qty,
        product: product.productId,
      })),
    });
    const savedOrder = await newOrder.save();
    const response = await savedOrder.populate('products.product').execPopulate();
    return resp.status(200).send(response);
  } catch (err) {
    // console.log('49:',err); // ¡Si quiero saber el error, console!
    next(err);
  }
};

// put
const updateOrder = async (req, resp, next) => {
  const { orderId } = req.params;
  const bodyUpdated = req.body;
  const status = ['pending', 'canceled', 'preparing', 'cooked', 'delivered'];
  const newBody = { $set: bodyUpdated };

  try {
    if (!validateParams(orderId)) return next(404);
    if (Object.keys(bodyUpdated).length === 0) return next(400);
    if (!status.includes(bodyUpdated.status)) return next(400);

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      newBody,
      { new: true, useFindAndModify: false },
    );
    return resp.status(200).send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// delete
const deleteOrder = async (req, resp, next) => {
  const { orderId } = req.params;
  console.log('90:', orderId);
  try {
    if (!validateParams(orderId)) return next(404);
    const deleted = await Order.findByIdAndDelete(orderId);
    console.log(deleted);
    return resp.status(200).send(deleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrders,
  getOrderId,
  createOrder,
  updateOrder,
  deleteOrder,
};
