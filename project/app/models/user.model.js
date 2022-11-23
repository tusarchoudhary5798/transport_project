const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema(
    {
         
        name: String,
        role: String,
        journey_history: [Object]
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
