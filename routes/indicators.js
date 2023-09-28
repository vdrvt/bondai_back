const express = require('express');
const router = express.Router();
const Indicator = require('../models/indicator');
const Value = require('../models/value');
const IndustryValue = require('../models/industryValue');

// Fetch all indicators
router.get('/', async (req, res) => {
    try {
        const indicators = await Indicator.find();
        res.json({ data: indicators });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new indicator
router.post('/', async (req, res) => {
    const indicator = new Indicator({ name: req.body.name });
    try {
        await indicator.save();
        res.status(201).json({ data: indicator });
    } catch (error) {
        if (error.code === 11000) { // 11000 is a MongoDB duplicate key error code
            res.status(400).json({ message: "Indicator already exists" });
        } else {
            res.status(500).json({ message: "Failed to add indicator" });
        }
    }
});

// Delete an indicator by ID
router.delete('/:id', async (req, res) => {
    console.log('Delete route hit');  // Add this line
    try {
        // First, delete all values and industry values associated with this indicator
        await Value.deleteMany({ indicator: req.params.id });
        await IndustryValue.deleteMany({ indicator: req.params.id });

        // Then, delete the indicator
        const indicator = await Indicator.findByIdAndRemove(req.params.id);
        if (!indicator) return res.status(404).json({ message: "Indicator not found" });
        res.status(200).json({ data: indicator });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete indicator" });
    }
});

module.exports = router;
