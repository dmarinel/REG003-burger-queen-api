const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
    userId: { 
      type: String,
      require: true
    },
    client: {
      type: String,
      require: true
    },
    products: [{
        qty: { type: Number, },
        product: { type: mongoose.ObjectId, },
      }],
    status: { 
      type: Number, 
      default: 'pending',
      require: true
    },
    dateEntry: { 
      type: Date,
      default: Date.now
    },
    dateProcessed: { type: Date }
})

module.exports = mongoose.model('Order', orderSchema)