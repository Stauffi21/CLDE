const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the dist/browser directory
app.use(express.static(path.join(__dirname, 'dist/browser')));

// For any other route, serve the index.html from the dist/browser directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
