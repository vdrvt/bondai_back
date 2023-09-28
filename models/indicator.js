const mongoose = require('mongoose');

const indicatorSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true},
    //value: { type: Number, required: true },
    // You can add more fields if necessary.
});


const Indicator = mongoose.model('Indicator', indicatorSchema);

module.exports = Indicator;






