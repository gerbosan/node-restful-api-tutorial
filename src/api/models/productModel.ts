import mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId }
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true }
})

const Product = mongoose.model('Product', schema)

export default Product
