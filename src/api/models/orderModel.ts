import mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
})

const Order = mongoose.model('Order', schema)

export default Order
