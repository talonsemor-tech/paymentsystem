const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING',
  },
  merchantRequestID: String,
  checkoutRequestID: String,
  resultCode: Number,
  resultDesc: String,
  rawResponse: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
