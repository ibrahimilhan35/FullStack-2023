// Importing required modules
const express = require('express');
const path = require('path');

// Creating an Express application
const app = express();

// Define a route for the root endpoint
app.get('/', (req, res) => {
  res.send("Welcome to my Express.js server!");
});

app.get('/about', (req, res) => {
  // Send HTML content with a clickable hyperlink
  res.send('You can visit our website in progress <a href="https://ibrahimilhan35.github.io/Geophysico-Website-Test/" target="_blank">here</a>.');
});

// Serve static files from the public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
// http://localhost:3000/index.html

// Route for greet
app.get('/greet', (req, res) => {
  const { name } = req.query;
  res.send(`Hello, ${name || 'Stranger'}!`);
});


// Set up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

