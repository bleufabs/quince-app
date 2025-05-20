const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
const rsvpRoutes = require('./routes/rsvpRoutes');
const photoRoutes = require('./routes/photoRoutes');

app.use('/api/rsvp', rsvpRoutes);
app.use('/api/photos', photoRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch((err) => console.error(err));