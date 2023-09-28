const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    indicator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indicator',
        required: true
    },
    value: { type: Number, required: true }
    // Add more fields if necessary (like timestamps, user who added the value, etc.)
});

const Value = mongoose.model('Value', valueSchema);

module.exports = Value;
