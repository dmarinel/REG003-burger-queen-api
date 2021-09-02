const Order = require('../models/order');
const { validateParams } = require('../utils/utils')
// get
const getOrders = (req, resp, next) => {
    Order.find({}, (err, orders) => {
        if (err) return resp.status(500).send({ message: `Error with product findById: ${err}`})
        if (!orders) return res.status(404).send({ message: `There are not products.` })
        resp.send(200, orders )
      })
}

// get by Order
const getOrderId = async (req, resp, next) => {
    let orderId = req.params.orderId

    try {
        if (!validateParams(orderId)) {
            return resp.status(404).send({ message: `The product doesn't exist.` })
        }
        const oneOrder = await Order.findById(orderId).populate('products.product')
        
        return resp.status(200).send( oneOrder ) 
    } catch (error) {
        // console.log('26:',err); // ¡Si quiero saber el error, console!
        next(err);
    }
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
        const newOrder = new Order({
            userId,
            client,
            products: products.map((product)=>({
                qty: product.qty,
                product: product.productId
            }))
        });
        const savedOrder = await newOrder.save();
        const response = await savedOrder.populate('products.product').execPopulate()
        return resp.status(200).send( response )

    } catch (err) {
       // console.log('49:',err); // ¡Si quiero saber el error, console!
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