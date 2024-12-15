const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// Serve static files from the dist/browser directory
app.use(express.static(path.join(__dirname, 'dist/browser')));

// Proxy für NewsAPI-Anfragen
app.get('/api/news', async (req, res) => {
  const apiKey = '4cbae97b2cf84264915bbebb661733d2'; // Dein NewsAPI-Schlüssel
  const baseUrl = 'https://newsapi.org/v2/top-headlines';
  const params = {
    apiKey: apiKey,
    language: req.query.language || 'en',
    category: req.query.category || 'general',
  };

  try {
    const response = await axios.get(baseUrl, { params });
    res.json(response.data); // Sende die Antwort der NewsAPI an das Frontend zurück
  } catch (error) {
    console.error('Fehler bei der API-Anfrage:', error.message);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten von NewsAPI' });
  }
});

// For any other route, serve the index.html from the dist/browser directory
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});