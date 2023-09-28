const express = require('express');
const router = express.Router();
const IndustryValue = require('../models/industryValue');

// Fetch all industry values
router.get('/', async (req, res) => {
    try {
        const industryValues = await IndustryValue.find().populate('indicator');
        res.json({ data: industryValues });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching industry values" });
    }
});

// Add new industry values or update existing ones
router.post('/', async (req, res) => {
    try {
        const promises = Object.entries(req.body).map(async ([indicator, { industryMin, industryMax }]) => {
            console.log(`Processing Indicator: ${indicator}, Min: ${industryMin}, Max: ${industryMax}`);
            await IndustryValue.findOneAndUpdate(
                { indicator: indicator },
                { industryMin: Number(industryMin), industryMax: Number(industryMax) },
                { upsert: true, new: true } 
            );
        });
        await Promise.all(promises); 
        res.status(201).json({ message: "Industry values updated successfully" });
    } catch (error) {
        console.error(`Error processing indicator:`, error);
        res.status(500).json({ message: "Failed to update industry values" });
    }
});

// Add new industry values or update existing ones
// router.post('/', async (req, res) => {
//     try {
//         const entries = Object.entries(req.body);

//         for (let [indicator, { industryMin, industryMax }] of entries) {

//             if (!indicator) {
//                 console.error("Missing or invalid indicator:", indicator);
//                 continue;  // Skip to the next iteration
//             }

//             console.log(`Processing Indicator: ${indicator}, Min: ${industryMin}, Max: ${industryMax}`);
//             await IndustryValue.findOneAndUpdate(
//                 { indicator: indicator },
//                 { industryMin: Number(industryMin), industryMax: Number(industryMax) },
//                 { upsert: true, new: true } 
//             );
//         }

//         res.status(201).json({ message: "Industry values updated successfully" });
//     } catch (error) {
//         console.error(`Error processing indicator:`, error);
//         res.status(500).json({ message: "Failed to update industry values" });
//     }
// });


module.exports = router;
