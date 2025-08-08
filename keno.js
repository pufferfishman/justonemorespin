document.getElementById("balance").innerHTML = "$" + getCookie("balance");

let selectedSquares = [];
let generatedSquares = [];
let amountSelected = 10;

function bet() {    
}

function generateSquares() {
    // generate an array of squares from 1-40 
    let allSquares = [];

    for (let i = 1; i <= amountSelected; i++) {
        allSquares.push(i);
    }

    // shuffle the array using the Fisher-Yates algorithm
    for (let i = allSquares.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [allSquares[i], allSquares[j]] = [allSquares[j], allSquares[i]];
    }

    // take the first n squares from the array (n = amountSelected)
    generatedSquares = allSquares.slice(0, amountSelected);
    return generateSquares;
}

function checkSquares() {
    
}