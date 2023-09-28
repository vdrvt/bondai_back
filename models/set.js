const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    indicator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indicator',
        required: true
    },
    weight: { type: Number }
});

const setSchema = new mongoose.Schema({
    clientName: { type: String, required: true, trim: true, unique: true },
    indicators: [weightSchema]
});

const Set = mongoose.model('Set', setSchema);
module.exports = Set;