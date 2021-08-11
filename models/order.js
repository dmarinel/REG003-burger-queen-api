const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
    userId: String,
    client: String,
    products: [{
        qty: { type: Number, },
        product: { type: mongoose.ObjectId, },
      }],
    status: { type: Number, },
    dateEntry: { type: Date }
})

module.exports = mongoose.model('Order', orderSchema)