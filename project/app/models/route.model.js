const mongoose = require('mongoose');

const { Schema } = mongoose;


const routeSchema = new Schema(
  {
    route_name: String,
    stations: [String],
  },
    { timestamps: true }
);

module.exports = mongoose.model('Route', routeSchema);




