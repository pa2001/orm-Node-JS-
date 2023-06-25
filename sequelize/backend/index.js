const express = require('express');
const api = require('./api');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', api);

// Serve static files from the public folder
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
