module.exports = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    status: err.status,
    code: err.code,
    response: err.response ? {
      status: err.response.status,
      statusText: err.response.statusText,
      data: err.response.data
    } : 'No response object'
  });

  if (err.response) {
    return res.status(err.response.status || 500).json({
      error: err.response.data || err.message || 'API Error',
      details: err.response.statusText
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    code: err.code || 'UNKNOWN_ERROR'
  });
};
