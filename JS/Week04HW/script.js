 // Function to start the countdown
 function startCountdown() {
    var inputElement = document.getElementById("countdownInput");
    var outputElement = document.getElementById("countdownOutput");

    // Get the user input
    var count = parseInt(inputElement.value);

    // Check if the input is a valid number
    if (isNaN(count)) {
        alert("Please enter a valid number.");
        return;
    }

    // Save the input value in local storage
    localStorage.setItem("lastInput", count);

    // Clear previous countdown
    outputElement.innerHTML = "";

    // Start the countdown
    var interval = setInterval(function() {
        outputElement.innerHTML = "T - " + count + " seconds";

        if (count === 0) {
            outputElement.innerHTML = "Liftoff!";
            clearInterval(interval);
        }

        count--;
    }, 1000);
}

// Event listener for the button
document.getElementById("startButton").addEventListener("click", startCountdown);

// Retrieve the last input from local storage
var lastInput = localStorage.getItem("lastInput");
if (lastInput) {
    document.getElementById("countdownInput").value = lastInput;
}