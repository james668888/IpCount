const mongoose = require('mongoose')

const ipInfoSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  }
})

module.exports = mongoose.model('IpInfo', ipInfoSchema)