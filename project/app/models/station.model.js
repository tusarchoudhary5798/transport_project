const mongoose = require('mongoose');

const { Schema } = mongoose;


const stationSchema = new Schema(
    {
         
        name: String,
        latitude: String,
        longitude: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('Station', stationSchema);
