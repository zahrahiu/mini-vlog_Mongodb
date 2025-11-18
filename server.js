const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir les vidéos depuis uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const videosRoute = require('./routes/videos');
app.use('/videos', videosRoute);

// Test route
app.get('/', (req, res) => res.send('Mini Vlog Backend'));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
