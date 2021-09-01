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
const createOrder = async (req, resp, next) => {
    // 1hora:09 min video: https://www.youtube.com/watch?v=-bI0diefasA 
    const {
        userId,
        client,
        products
    } = req.body

    try {
        if (Object.keys(req.body).length === 0 || req.body.products.length === 0) return next(400);

        // 1hora:22 min video: https://www.youtube.com/watch?v=-bI0diefasA 
        const newOrder = await new Order({
            userId,
            client,
            products: products.map((product)=>({
                qty: product.qty,
                product: product.productId
            }))
        });
        console.log('43:', newOrder.products);
        const saveOrder = newOrder(newOrder)
        saveOrder.save();
        console.log(saveOrder);
        return resp.status(200).send( saveOrder )

    } catch (err) {
        next(err);
    }    
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