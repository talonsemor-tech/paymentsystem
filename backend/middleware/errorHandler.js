module.exports = (err, req, res, next) => {
  console.error('Error:', err.message || err);
  if (err.response) {
    console.error('Response status:', err.response.status);
    console.error('Response data:', err.response.data);
    return res.status(err.response.status || 500).json({
      error: err.response.data || err.message || 'Internal Server Error',
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
