const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mpesaRoutes = require('./routes/mpesaRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'M-Pesa backend is running', endpoint: '/api/mpesa/callback' });
});

app.use('/api/mpesa', mpesaRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mpesa-payment-system';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`M-Pesa payment server running on port ${PORT}`);
});
