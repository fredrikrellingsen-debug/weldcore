const http = require('http'), fs = require('fs'), path = require('path');
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]);
  let f = path.join(__dirname, p);
  if (!f.startsWith(__dirname)) { s.writeHead(403); return s.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { s.writeHead(404); return s.end('Ikke funnet'); }
  s.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
}).listen(process.env.PORT||4817, () => console.log('http://localhost:'+(process.env.PORT||4817)));
