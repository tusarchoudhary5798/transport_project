const mongoose = require('mongoose');

const { Schema } = mongoose;


const activeRouteSchema = new Schema(
  {
    name: String,
    driver: String,
    route: String,
    next_station: String,
    arrive_time: String,
    passangers: [String],

  },
    { timestamps: true }
);

module.exports = mongoose.model('ActiveRoute', activeRouteSchema);




