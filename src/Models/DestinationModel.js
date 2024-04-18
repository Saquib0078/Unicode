const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  startingPackagePrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  image:{ type: String, required: true }

});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;