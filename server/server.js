// Import required modules
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Create express app
const app = express();
const PORT = process.env.PORT || 3000; // Set port

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Routers
const seedRouter = require('./routes/seed');
const statesRouter = require('./routes/states');

// Middleware
app.use(express.json());

// Use routers
app.use('/seed', seedRouter);
app.use('/states', statesRouter);

// Routes

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
