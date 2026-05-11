const axios = require('axios');
const Transaction = require('../models/Transaction');
const { getAccessToken } = require('../config/mpesaConfig');

const getEndpoint = () =>
  process.env.MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

exports.stkPush = async (req, res, next) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: 'phone and amount are required' });
    }

    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const password = Buffer.from(
      `${process.env.BUSINESS_SHORTCODE}${process.env.PASSKEY}${timestamp}`
    ).toString('base64');

    const payload = {
      BusinessShortCode: process.env.BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.BUSINESS_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: process.env.ACCOUNT_REFERENCE || 'Payment',
      TransactionDesc: process.env.TRANSACTION_DESC || 'M-Pesa Payment',
    };

    const response = await axios.post(
      `${getEndpoint()}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const transaction = await Transaction.create({
      phone,
      amount,
      merchantRequestID: response.data.MerchantRequestID,
      checkoutRequestID: response.data.CheckoutRequestID,
      rawResponse: response.data,
    });

    res.status(200).json({
      message: 'STK Push request sent. Check your phone.',
      transaction,
      response: response.data,
    });
  } catch (error) {
    next(error);
  }
};

exports.mpesaCallback = async (req, res, next) => {
  try {
    const callbackData = req.body;
    const checkoutRequestID = callbackData?.Body?.stkCallback?.CheckoutRequestID;
    const resultCode = callbackData?.Body?.stkCallback?.ResultCode;
    const resultDesc = callbackData?.Body?.stkCallback?.ResultDesc;

    if (checkoutRequestID) {
      await Transaction.findOneAndUpdate(
        { checkoutRequestID },
        {
          status: resultCode === 0 ? 'SUCCESS' : 'FAILED',
          resultCode,
          resultDesc,
          rawResponse: callbackData,
        },
        { new: true }
      );
    }

    res.status(200).json({ status: 'received' });
  } catch (error) {
    next(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
