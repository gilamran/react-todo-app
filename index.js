const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 80;
const API_TARGET = process.env.API_URL; // e.g. http://localhost:3000

if (!API_TARGET) {
  console.error('ERROR: Missing API_URL environment variable');
  process.exit(1);
}

console.log('Proxying /api to API_TARGET"', API_TARGET);

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

// Serve React static files
app.use(express.static(path.join(__dirname, 'build')));

// React SPA fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Client server running on port ${PORT}, proxying API to ${API_TARGET}`);
});