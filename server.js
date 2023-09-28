import {} from .env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const indicatorRoutes = require('./routes/indicators');
const valueRoutes = require('./routes/values');
const industryValueRoutes = require('./routes/industryValues');
const setRoutes = require('./routes/sets');
const muser = process.env.muser;
const mpass = process.env.mpass;
const mURL = process.env.mURL;


const app = express(); // Initialize express appliccation

const mongoDBConnectionString = 'mongodb+srv://'&muser&':'&mpass&'@'&mURL;  // Replace with your connection string

// Connect to MongoDB Atlas
mongoose.connect(mongoDBConnectionString, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true - removed cause chatGPT said so 
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(error => console.error('Could not connect to MongoDB Atlas', error));

// Middlewares
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse incoming request bodies as JSON


app.use('/indicators', indicatorRoutes);
app.use('/values', valueRoutes);
app.use('/industryValues', industryValueRoutes);
app.use('/sets', setRoutes);


// Server listening - this should be in the end!!! 
const PORT = process.env.PORT || 5000; // Use the environment's port if available, else 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
