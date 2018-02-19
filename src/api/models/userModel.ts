import mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  password: { type: String, required: true}
})

const User = mongoose.model('User', schema)

export default User
