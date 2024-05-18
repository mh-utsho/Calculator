let previousAnswer = 0; // Variable to store the previous answer

function storePreviousAnswer() {
    const display = document.getElementById('display');
    if (display.value !== 'Error') {
        previousAnswer = display.value;
        console.log('Previous answer:', previousAnswer); // Debugging line
    }
}

function usePreviousAnswer() {
    const display = document.getElementById('display');
    display.value = previousAnswer;
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    const lastChar = display.value[display.value.length - 1];
    if (
        (operator === '^' && !isNaN(parseInt(lastChar))) || // Check if the last character is a number for '^'
        (lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/' && lastChar !== '%' && lastChar !== '(')
    ) {
        display.value = display.value + operator;
    } else if (operator === 'xor') { // Adding XOR functionality
        display.value = display.value + '^'; // Append '^' instead of 'xor' to the expression
    } else if (operator === '**') { // Adding exponentiation functionality
        display.value = display.value + '^'; // Append '^' for exponentiation
    }
    console.log("Expression after appending operator:", display.value); // Debugging line
}

function appendNumber(number) {
    const display = document.getElementById('display');
    display.value = display.value + number;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        let expression = display.value;
        const result = eval(expression);
        display.value = `${expression}=${result}`; // Display expression along with the result
    } catch (error) {
        display.value = 'Error';
    }
}

function parseExponentiation(expression) {
    // Regular expression to match exponentiation: base^exponent
    const regex = /(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g;

    // Replace all matches of exponentiation with the result of exponentiation
    return expression.replace(regex, (match, base, exponent) => Math.pow(parseFloat(base), parseFloat(exponent)));
}

function binaryToDecimal() {
    const display = document.getElementById('display');
    const binaryValue = display.value;
    const decimalValue = parseInt(binaryValue, 2); // Convert binary to decimal
    display.value = decimalValue;
}

function decimalToBinary() {
    const display = document.getElementById('display');
    const decimalValue = display.value;
    const binaryValue = (decimalValue >>> 0).toString(2); // Convert decimal to binary
    display.value = binaryValue;
}

// Function to calculate exponentiation
function power(base, exponent) {
    return Math.pow(base, exponent);
}

// Handling keyboard
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;

    // Check if the pressed key is a digit or an operator
    if (!isNaN(key) || ['+', '-', '*', '/', '^', '%'].includes(key)) {
        event.preventDefault(); // Prevent the default behavior of the key press
        if (!isNaN(key)) {
            appendNumber(parseInt(key)); // If the key is a digit, append it as a number
        } else {
            appendOperator(key); // If the key is an operator, append it
        }
    }

    // Check if the pressed key is Enter (=) or Backspace or Delete
    if (key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of the key press
        calculate(); // Calculate the expression when Enter is pressed
    } else if (key === 'Backspace') {
        event.preventDefault(); // Prevent the default behavior of the key press
        backspace(); // Remove one character from the display when Backspace is pressed
    } else if (key === 'Delete') {
        event.preventDefault(); // Prevent the default behavior of the key press
        clearDisplay(); // Clear the display when Delete is pressed
    }
}

function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1); // Remove the last character from the display
}
