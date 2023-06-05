const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.freshauto.com.ua; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://front.freshauto.com.ua https://api.freshauto.com.ua");

  next();
});

app.get('/api/cars/GetOnSale', (req, res) => {
  const url = 'https://api.freshauto.com.ua/api/cars/GetOnSale';

  import('node-fetch')
    .then(module => module.default(url))
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Налаштування статичних файлів
app.use(express.static(path.join(__dirname, 'dist', 'freshauto')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'freshauto', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});