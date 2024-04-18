const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  image:{ type: String, required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;