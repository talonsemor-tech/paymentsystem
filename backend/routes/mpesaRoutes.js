const express = require('express');
const router = express.Router();
const {
  stkPush,
  mpesaCallback,
  getTransactions,
} = require('../controllers/mpesaController');

router.post('/pay', stkPush);
router.post('/callback', mpesaCallback);
router.get('/transactions', getTransactions);

module.exports = router;
