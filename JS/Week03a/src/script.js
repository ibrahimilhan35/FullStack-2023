// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Get the submit button element
    var submitButton = document.querySelector('.btn');
  
    // Add a click event listener to the submit button
    submitButton.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the form from submitting (for demonstration purposes)
  
      // Get the image element by ID
      var contactImage = document.getElementById('contact-image');
  
      // Change the image source
      contactImage.src = 'images/Contact3-320x320.jpg';
    });
  });
  