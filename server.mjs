import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const CLIENT_DIR = path.resolve(__dirname, 'dist', 'client');

// Import the compiled SSR app handler
const { default: appHandler } = await import('./dist/server/server.js');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer(async (req, res) => {
  try {
    const hostHeader = req.headers.host || `localhost:${PORT}`;
    const url = new URL(req.url || '/', `http://${hostHeader}`);

    // Quick health check
    if (url.pathname === '/_health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
      return;
    }

    // Try serving static files from dist/client
    if (req.method === 'GET' || req.method === 'HEAD') {
      const safePath = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(CLIENT_DIR, safePath);
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          const isImmutableAsset = safePath.startsWith('/assets') || safePath.startsWith('assets');
          const cacheControl = isImmutableAsset
            ? 'public, max-age=31536000, immutable'
            : 'public, max-age=3600';

          res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stat.size,
            'Cache-Control': cacheControl,
          });

          if (req.method === 'HEAD') {
            res.end();
            return;
          }

          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }
    }

    // Dynamic SSR request handling
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (v !== undefined) {
        headers.set(k, Array.isArray(v) ? v.join(', ') : v);
      }
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method || '') ? undefined : req,
      duplex: 'half',
    });

    const response = await appHandler.fetch(request);

    const resHeaders = {};
    response.headers.forEach((v, k) => {
      resHeaders[k] = v;
    });

    res.writeHead(response.status, resHeaders);

    if (response.body) {
      const buf = Buffer.from(await response.arrayBuffer());
      res.end(buf);
    } else {
      res.end();
    }
  } catch (err) {
    console.error('Request handling error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Mind Masters AI Solutions running on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close(() => process.exit(0));
});
