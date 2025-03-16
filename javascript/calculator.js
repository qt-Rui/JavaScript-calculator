let calc = JSON.parse(localStorage.getItem('calc')) || ''; /* Get last calculation from local storage */
console.log(calc);


/* input the number or symbol onto the webpage */
function updateCalc(num) {
    if (num === '%') {
        calc = (parseFloat(calc) / 100).toString();
    } else {
        calc += num;
    }
    console.log(typeof calc);
    display();

    localStorage.setItem('calc', JSON.stringify(calc));
}


/* Take out or add in neg sign on left of number */
function negOrPos() {
    if (calc === '0') {
        return; /* Do nothing */
    }

    if (calc.charAt(0) === '-') { /*Take out if - is there, or add if not */
        calc = calc.slice(1);
    } else {
        calc = '-' + calc;
    }

    console.log(calc);
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

/* Display whatever is typed or 0 shows by default */
function display () {    
    document.querySelector('.js-display').innerHTML = calc || '0';
}

/* Integrating the use of number and operation keys, delete, and enter */
document.addEventListener("keydown", function (event) {
    let key = event.key;

    if (!isNaN(key)) { /* For 0-9 */
        updateCalc(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        updateCalc(` ${key} `);
    } else if (key === "Enter") {
        calc = eval(calc);
        calc = parseFloat(calc.toFixed(4));
        display();
    } else if (key === ".") {
        updateCalc('.');
    } else if (key === "Backspace") {
        delLastChar();
    }
});

display();