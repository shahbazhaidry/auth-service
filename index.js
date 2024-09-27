const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Mongo Connection error', err));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))