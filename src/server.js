// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Statische Dateien aus dem dist-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'dist')));

// Alle Routen zu index.html weiterleiten (für Angular Routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
