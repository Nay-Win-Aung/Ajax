const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Check if the request is for the ajax_info.txt file
  if (req.url === '/ajax_info.txt') {
    const filePath = path.join(__dirname, 'ajax_info.txt');
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } else {
    // Handle other requests (e.g., serving the HTML file)
    // You can add additional routes here if needed
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
