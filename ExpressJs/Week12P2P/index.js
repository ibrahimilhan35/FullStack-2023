const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON data

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

// Function to write data to the geophysicoServices.json file
function writeDataToFile(data, callback) {
  fs.writeFile('geophysicoServices.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err.message);
      callback(err);
    } else {
      callback(null);
    }
  });
}

// Route to fetch data from a file
app.get('/fetchFileData', (req, res) => {
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(data);
    }
  });
});

// Route to add a service
app.post('/addService', (req, res) => {
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Add a new service to the data
      const newService = req.body; // Assuming the request body contains the new service data
      data.push(newService);

      // Write the updated data back to the file
      writeDataToFile(data, (writeErr) => {
        if (writeErr) {
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).send('Service added successfully');
        }
      });
    }
  });
});

// Route to get all services
app.get('/getAllServices', (req, res) => {
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(data);
    }
  });
});

// Route to partially update a service by id
app.patch('/updateService/:id', (req, res) => {
    const serviceId = parseInt(req.params.id, 10);
    readDataFromFile((err, data) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const serviceIndex = data.findIndex((service) => service.id === serviceId);
        if (serviceIndex !== -1) {
          // Update only the specified fields in the service data
          for (const key in req.body) {
            if (key !== 'id') {
              data[serviceIndex][key] = req.body[key];
            }
          }
  
          // Write the updated data back to the file
          writeDataToFile(data, (writeErr) => {
            if (writeErr) {
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.status(200).send('Service partially updated successfully');
            }
          });
        } else {
          res.status(404).json({ error: 'Service not found' });
        }
      }
    });
  });

// Route to edit a service by id
app.put('/editService/:id', (req, res) => {
  const serviceId = parseInt(req.params.id, 10);
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const serviceIndex = data.findIndex((service) => service.id === serviceId);
      if (serviceIndex !== -1) {
        // Update the service data
        data[serviceIndex] = { ...data[serviceIndex], ...req.body };

        // Write the updated data back to the file
        writeDataToFile(data, (writeErr) => {
          if (writeErr) {
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).send('Service updated successfully');
          }
        });
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    }
  });
});

// Route to delete a service by id
app.delete('/deleteService/:id', (req, res) => {
  const serviceId = parseInt(req.params.id, 10);
  readDataFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const updatedData = data.filter((service) => service.id !== serviceId);

      if (updatedData.length < data.length) {
        // Service was found and deleted
        writeDataToFile(updatedData, (writeErr) => {
          if (writeErr) {
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).send('Service deleted successfully');
          }
        });
      } else {
        // Service was not found
        res.status(404).json({ error: 'Service not found' });
      }
    }
  });
});

// Handle not found routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
