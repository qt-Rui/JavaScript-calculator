document.addEventListener('DOMContentLoaded', () => {
    let calc = JSON.parse(localStorage.getItem('calc')) || ''; /* Get last calculation from local storage */
    console.log(calc);


    /* input the number or symbol onto the webpage */
    function updateCalc(num) {
        if (num === '%') {
            calc = (parseFloat(calc) / 100).toString();
        } else if (['+', '-', '/', '*'].includes(num)) {
            calc += ` ${num} `;
        } else {
            calc += num;
        }
        console.log(typeof calc);
        display();

        localStorage.setItem('calc', JSON.stringify(calc));
    }


    /* Take out or add in neg sign on left of number */
    function negOrPos() {
        if (!calc) return; // Do nothing if calc is empty

        // Splitting numbers and operators apart
        let tokens = calc.trim().split(/([\+\-\*\/])/);

        // Loop backwards to find last num
        // When +/- button is clicked, it will either add or take out '-' for last num input
        for (let i = tokens.length - 1; i >= 0; i--) {
            if (tokens[i].trim() !== '' && !['+', '-', '*', '/'].includes(tokens[i])) {
                let number = tokens[i].trim(); // Get num without spaces

                if (number.startsWith(' -')) {
                    tokens[i] = number.slice(1);
                } else {
                    tokens[i] = ' -' + number;
                }
                break;
            }
        }
        calc = tokens.join(''); // updated expression
        display();
        localStorage.setItem('calc', JSON.stringify(calc));
    }


    /* Take out last character */
    function delLastChar() {
        if (calc.length > 0) {
            calc = calc.slice(0, -1);
        }
        console.log(calc);
        display();

        localStorage.setItem('calc', JSON.stringify(calc));

    }


    function calculateResult() {
        calc = eval(calc);
        calc = parseFloat(calc.toFixed(4).toString());
        display();
        localStorage.setItem('calc', JSON.stringify(calc));
    }


    /* Display whatever is typed or 0 shows by default */
    function display () {    
        document.querySelector('.js-display').innerHTML = calc || '0';
    }


    /* Integrating the use of number and operation keys, delete, and enter */
    document.addEventListener("keydown", (event) => {
        let key = event.key;

        if (!isNaN(key)) { /* For 0-9 */
            updateCalc(key);
        } else if (key === "+" || key === "-" || key === "*" || key === "/") {
            updateCalc(`${key}`);
        } else if (key === "Enter") { // Evaluate
            event.preventDefault();
            calculateResult();
        } else if (key === ".") {
            updateCalc('.');
        } else if (key === "Backspace") {
            delLastChar();
        }
    });


    /* onclick for buttons */
    document.querySelectorAll('.calc-num button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            const action = button.dataset.action;

            if (value !== undefined) {
                updateCalc(value); /* Handles numbers */
            } else if (action === 'clear') {
                calc=''; /* Clear display when AC clicked */
                display();
                localStorage.setItem('calc', JSON.stringify(calc));
            } else if (action === 'negate') { /* Change num to neg or pos */
                negOrPos();
            } else if (action === 'delete') { /* Delete last typed or clicked num */
                delLastChar();
            } else if (action === 'evaluate') {
                calculateResult();
            }
        });
    });

    display();
});
