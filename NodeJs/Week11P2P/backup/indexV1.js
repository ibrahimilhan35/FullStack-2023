const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Route for the root endpoint
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Node.js server!');
  }
  // Route to fetch data from a file
  else if (parsedUrl.pathname === '/fetchFileData') {
    // Read data from the geophysicoServices.json file
    fs.readFile('geophysicoServices.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        const jsonData = JSON.parse(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonData));
      }
    });
  }
  // Route not found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Set up the server to listen on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
