// Create a function that calculates any kind of formula using two variables.
let x=5;
let y=3;

function multiply(x, y) {
    let z = x * y;
    console.log("Multiplying the two given numbers is equal to " + z);
};

multiply(4, 5)
console.log()

// Create a function using the arrow function format, that performs any action/calculation, whatever you want! Example: let myFunction = (x, y) => y - x;
let myMultiply = (a, b) => {
    let c = a * b;
    console.log("Multiplying the two given numbers is equal to " + c);
}

myMultiply(3, 5)
console.log()
