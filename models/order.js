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
        product: { 
          type: Schema.Types.ObjectId,
          //The ref option is what tells Mongoose which model to use during population
          ref: 'Product'
        },
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