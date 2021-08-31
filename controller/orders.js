const Order = require('../models/order');

// get
const getOrders = (req, resp, next) => {
    Order.find({}, (err, orders) => {
        if (err) return resp.status(500).send({ message: `Error with product findById: ${err}`})
        if (!orders) return res.status(404).send({ message: `There are not products.` })
        resp.send(200, orders )
      })
}

// get by Order
const getOrderId = (req, resp, next) => {
    let orderId = req.params.orderId
    Order.findById(orderId, (err, order) => {
      //console.log('20:', isObjectId(productId));
      if (!order) return resp.status(404).send({ message: `The product doesn't exist.` })
      resp.status(200).send( order ) 
    })
}

// post
const createOrder = (req, resp, next) => {
    let order = {
        userId: req.body.userId,
        client: req.body.client,
        products: req.body.products,
    }
    console.log('32:', order);
    console.log('33:', req.body);
    
    console.log('36:', req.body.products);
    
    if (order.products.length === 0 || !order.products) return next(400);
    
    Order.create(order, (err, orderStored) => { //cuando se almacene, mongodb le adiciona un id
        if (err) return next(err);
        else { resp.status(200).send( orderStored ) }
    }) 
}

// put
const updateOrder = (req, resp, next) => {
    let orderId = req.params.orderId
    let bodyUpdated = req.body
    //let price = req.body.price
    
    // son 2 argumentos, el 2do es un objeto con los campos que deseo actualizar
    Order.findByIdAndUpdate(orderId, bodyUpdated, (err, orderUpdated) => {
        //if (typeof price !== 'number') return next(400)
        if (err) return resp.status(404).send({ message: `There is a mistake trying to update the product: ${err}` })
        resp.status(200).send( bodyUpdated )
    })
}

// delete
const deleteOrder = async (req, resp, next) => {
    let orderId = req.params.orderId
    try {
        const deleted = await Order.findByIdAndDelete(orderId)  
        resp.status(200).send({ message: `The product ${deleted} has been removed succesfully.` })
    } catch (err) {
        if (err) resp.status(404).send({ message: `There is a mistake trying to delete the product: ${err}` }) 
    }
}

module.exports = {
    getOrders,
    getOrderId,
    createOrder,
    updateOrder,
    deleteOrder
}