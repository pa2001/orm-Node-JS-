const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Include the API routes
const apiRoutes = require('./models/api');
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log('Server is running on port', port);
});
