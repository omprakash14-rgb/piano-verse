const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// API placeholder (you can add routes here)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// All other routes return the index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
