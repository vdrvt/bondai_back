const mongoose = require('mongoose');

const industryValueSchema = new mongoose.Schema({
    indicator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indicator',
        required: true
    },
    industryMin: { type: Number },
    industryMax: { type: Number }
});

const IndustryValue = mongoose.model('IndustryValue', industryValueSchema);

module.exports = IndustryValue;
