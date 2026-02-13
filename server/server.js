// server.js (CommonJS)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, 'data', 'transactions.json');

/** Optional: allow your frontend origin during local dev (e.g., Vite on 5173) */
const FRONTEND_ORIGIN = 'http://localhost:5173';
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCORS(res);
    res.writeHead(204);
    return res.end();
  }

  // API that serves the JSON file: GET /api/data
  if (req.method === 'GET' && req.url === '/transactions') {
    setCORS(res);

    fs.stat(DATA_PATH, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ error: 'data.json not found' }));
      }

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Content-Length': stats.size,
      });

      // Stream the file to avoid loading it entirely in memory
      const stream = fs.createReadStream(DATA_PATH, { encoding: 'utf-8' });
      stream.pipe(res);
      stream.on('error', () => {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Failed to read data.json' }));
      });
    });
    return;
  }

  // Optional: serve a simple HTML file from /public
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const filePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(filePath, 'utf-8', (err, html) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`<h1>Node Server</h1><p>Try GET <code>/api/data</code></p>`);
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
``