const http = require('http');
const url = require('url');
const fs = require('fs');

// Function to read data from the geophysicoServices.json file
function readDataFromFile(callback) {
  fs.readFile('geophysicoServices.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err.message);
      callback(err, null);
    } else {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Node.js server!');
  } else if (parsedUrl.pathname === '/fetchFileData') {
    // Route to fetch data from a file
    readDataFromFile((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    });
  } else if (parsedUrl.pathname === '/addService') {
    // Route to add a service (dummy implementation)
    // You can modify this part to handle the actual service addition logic
    readDataFromFile((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        // Add a new service to the data
        const newService = { name: 'Gravity', content: "A gravity survey measures changes in the Earth's gravity caused by variations in the subsurface's density. Microgravity refers to a highly accurate measurement and interpretation of very small variations in the Earth's gravity field and used when the near-surface futures are of interest. These could include karst features (caves, conduits, dissolution zones), hidden channels, tunnels, lateral changes in soil or rock density, large fractures, mines and geologic hazards. Measurements taken in a survey grid or along survey lines to produce plan-view contour maps that display lateral trends and direct confirmatory borings."};
        data.push(newService);

        // Write the updated data back to the file
        fs.writeFile('geophysicoServices.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Service added successfully');
          }
        });
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
