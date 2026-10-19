const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
http.createServer((req,res)=>{
 let name;
 try { name = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
 const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 const relative=path.relative(root,file);
 if(relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(p=>p.startsWith('.'))){res.writeHead(403);return res.end();}
 const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.gif':'image/gif','.webp':'image/webp'};
 const type=types[path.extname(file)];
 if(!type){res.writeHead(404);return res.end();}
 fs.stat(file,(err,stat)=>{
 if(err||!stat.isFile()){res.writeHead(404);return res.end();}
 res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});
 if(req.method==='HEAD')return res.end();
 fs.createReadStream(file).pipe(res);
 });
}).listen(4174,'127.0.0.1',()=>console.log('Lucy website preview: http://127.0.0.1:4174/'));
