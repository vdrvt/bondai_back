const express = require('express');
const router = express.Router();
const Value = require('../models/value');

// Fetch all values
router.get('/', async (req, res) => {
    try {
        const values = await Value.find().populate('indicator');
        res.json({ data: values });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching values" });
    }
});

// Add new values or update existing ones
router.post('/', async (req, res) => {
    try {
        const promises = Object.entries(req.body).map(async ([indicatorId, value]) => {
            await Value.findOneAndUpdate(
                { indicator: indicatorId },
                { value: Number(value) },
                { upsert: true, new: true } // This ensures that if the value doesn't exist, it creates one. If it does, it updates it.
            );
        });
        await Promise.all(promises); // This will wait for all promises (database operations) to finish.
        res.status(201).json({ message: "Values updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update values" });
    }
});

module.exports = router;
