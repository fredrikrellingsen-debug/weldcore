const http = require('http'), fs = require('fs'), path = require('path');
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  const out = {};
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(line => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) out[m[1].trim()] = m[2].trim();
    });
  }
  return out;
}

http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]);
  if (p === '/__/firebase/init.json') {
    const env = loadEnv();
    s.writeHead(200, { 'Content-Type': 'application/json' });
    return s.end(JSON.stringify({
      apiKey: env.FIREBASE_API_KEY || '',
      authDomain: env.FIREBASE_AUTH_DOMAIN || 'pot-kunder-439a4.firebaseapp.com',
      projectId: env.FIREBASE_PROJECT_ID || 'pot-kunder-439a4',
      storageBucket: env.FIREBASE_STORAGE_BUCKET || 'pot-kunder-439a4.firebasestorage.app',
      messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || '461155550472',
      appId: env.FIREBASE_APP_ID || '1:461155550472:web:76a9c52afc45550ae3d8bd'
    }));
  }
  let f = path.join(__dirname, p);
  if (!f.startsWith(__dirname)) { s.writeHead(403); return s.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { s.writeHead(404); return s.end('Ikke funnet'); }
  s.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
}).listen(process.env.PORT || 4817, () => console.log('http://localhost:' + (process.env.PORT || 4817)));
