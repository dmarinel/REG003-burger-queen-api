const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Name is required.'],
  },
  price: {
    type: Number,
    default: 0,
  },
  image: String,
  type: {
    type: String,
    enum: ['drink', 'burger', 'side dishes'],
    require: [true, 'Name is required.'],
  },
  dateEntry: {
    type: Date,
    default: Date.now,
  },
});
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', productSchema);
