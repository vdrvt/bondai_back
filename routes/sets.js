const express = require('express');
const router = express.Router();
const Set = require('../models/set');

// Fetch all sets
router.get('/', async (req, res) => {
    try {
        const sets = await Set.find().populate('indicators.indicator');
        res.json({ data: sets });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching sets" });
    }
});

// Add a new set
router.post('/', async (req, res) => {
    const { clientName, indicators } = req.body;
    
    try {
        const newSet = new Set({
            clientName,
            indicators
        });
        
        await newSet.save();
        res.status(201).json({ message: "Set created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to create a new set" });
    }
});

// Fetch indicators and their weights of a specific set by its ID
router.get('/:setId/indicators', async (req, res) => {
    try {
        const set = await Set.findById(req.params.setId).populate('indicators.indicator');

        if (!set) {
            return res.status(404).json({ message: "Set not found" });
        }

        // Return both the indicators and their weights of the set
        const indicatorsWithWeights = set.indicators.map(indicator => ({
            indicator: indicator.indicator,
            weight: indicator.weight
        }));
        
        res.json({ data: indicatorsWithWeights });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching indicators and weights from the set" });
    }
});



module.exports = router;
