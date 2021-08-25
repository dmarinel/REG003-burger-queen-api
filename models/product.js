const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: {
        type: String,
        require: [true, 'Name is required.'],
    },
    price: { type: Number, default: 0 },
    image: String,
    type: { 
        type: String, 
        enum: ['drink', 'burger', 'side dishes'],
        require: [true, 'Name is required.']
    },
    dateEntry: { type: Date }
})

module.exports = mongoose.model('Product', productSchema)