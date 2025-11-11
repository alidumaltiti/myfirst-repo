const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/tamale_directory';

// Simple business schema
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  phone: String,
  address: String,
  coords: { lat: Number, lng: Number },
  description: String,
  images: [String],
  premium: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Business = mongoose.model('Business', businessSchema);

// Connect DB
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch((err)=> console.error('MongoDB connection error', err));

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Create listing
app.post('/api/businesses', async (req, res) => {
  try {
    const b = new Business(req.body);
    await b.save();
    res.status(201).json(b);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List with optional category & search & premium first
app.get('/api/businesses', async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$or = [
      { name: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
      { address: new RegExp(q, 'i') }
    ];
    // premium first
    const results = await Business.find(filter).sort({ premium: -1, createdAt: -1 }).limit(200);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single business
app.get('/api/businesses/:id', async (req, res) => {
  try {
    const b = await Business.findById(req.params.id);
    if (!b) return res.status(404).json({ error: 'Not found' });
    res.json(b);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
