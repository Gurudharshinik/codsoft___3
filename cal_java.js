// script.js

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '0';
                previousInput = '';
                operator = null;
                resultDisplayed = false;
                display.innerText = currentInput;
            } else if (value === '=') {
                if (previousInput && operator && currentInput) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = null;
                    resultDisplayed = true;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (!operator) {
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                } else if (currentInput) {
                    previousInput = calculate(previousInput, operator, currentInput);
                    operator = value;
                    currentInput = '';
                    display.innerText = previousInput;
                }
            } else {
                if (resultDisplayed) {
                    currentInput = value;
                    resultDisplayed = false;
                } else {
                    currentInput = currentInput === '0' ? value : currentInput + value;
                }
                display.innerText = currentInput;
            }
        });
    });

    function calculate(operand1, operator, operand2) {
        operand1 = parseFloat(operand1);
        operand2 = parseFloat(operand2);

        switch (operator) {
            case '+':
                return (operand1 + operand2).toString();
            case '-':
                return (operand1 - operand2).toString();
            case '*':
                return (operand1 * operand2).toString();
            case '/':
                return (operand1 / operand2).toString();
            default:
                return operand1.toString();
        }
    }
});
