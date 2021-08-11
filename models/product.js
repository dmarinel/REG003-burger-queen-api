const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: String,
    price: { type: Number, default: 0 },
    image: String,
    type: { type: String, enum: ['drink', 'burger', 'side dishes'] },
    dateEntry: { type: Date }
})

module.exports = mongoose.model('Product', productSchema)