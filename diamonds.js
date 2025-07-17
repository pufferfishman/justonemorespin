// 7 diamond colours:
// red yellow green cyan blue purple pink

let diamonds = [];
let currentIndex = 0;
let betInterval;
let diamondRenderDelay = 200;
let autobetDelay = 2000;
let autobetInterval = null;

// start autobet
document.getElementById("autobet").addEventListener("click", () => {
    document.getElementById("autobet").innerHTML = "Stop Autobet";

    // prevent multiple intervals
    if (autobetInterval !== null) {
        clearInterval(autobetInterval); 
        autobetInterval = null;
        document.getElementById("autobet").innerHTML = "Autobet";
        return;
    }

    bet(); // run the first bet immediately

    autobetInterval = setInterval(bet, ((diamondRenderDelay * 5) + 1000)); // bet when the current diamonds finish rendering + 1 second
});

// stop autobet
document.getElementById("stopAutobet").addEventListener("click", () => {
    clearInterval(autobetInterval);
    autobetInterval = null;
});

function bet() {
    diamonds = [];
    currentIndex = 0;

    // clear all diamond element;
    document.querySelectorAll(".diamond").forEach(element => element.remove());

    // reset the highlighted hand
    renderDiamondHand("nomatch");

    // generate the first diamond instantly

    // continued generating one diamond every half second
    betInterval = setInterval(() => {
        // stop generating diamonds after 5 iterations
        if (currentIndex >= 5) {
            clearInterval(betInterval);
            return;
        }

        addDiamond(currentIndex);
    }, diamondRenderDelay);
}

function addDiamond(i) {
    // generate and add one diamond
    const newDiamond = Math.floor(Math.random() * 7) + 1;
    diamonds.push(newDiamond);

    // render current diamonds
    renderDiamond(i);

    // detect hand
    const handID = detectHand(diamonds);

    // render hand
    renderDiamondHand(handID);

    // increment index
    currentIndex++;
}

/*function bet() {
    // clear diamonds
    diamonds = [];

    
    for (let i = 0; i < 5; i++) {
        
    }

    console.log(diamonds);

    
    

    for (let i of diamonds) {
        counts[i] = (counts[i] || 0) + 1;
    }

    console.log(counts);

    
    
    

    console.log(frequency);

    // detect which hand the diamonds make
    let hand;
    let handID;
    let frequency;
    let counts;

    for (let i = 0; i < 5; i++) {
        counts = {}

        // generate 1 more diamond
        diamonds.push(Math.floor(Math.random() * 7) + 1);
        
        // form diamond counts
        for (let j of diamonds) {
            counts[j] = (counts[j] || 0) + 1;
        }
        
        // sort the counts by most to least
        frequency = Object.values(counts).sort((a, b) => b - a);

        // detect which hand the diamonds make
        if (frequency[0] === 5) {
            handID = "fiveofakind";
            hand = "Five of a Kind";
        } else if (frequency[0] === 4) {
            handID = "fourofakind";
            hand = "Four of a Kind";
        } else if (frequency[0] === 3 && frequency[1] === 2) {
            handID = "fullhouse";
            hand = "Full House";
        } else if (frequency[0] === 3) {
            handID = "threeofakind";
            hand = "Three of a Kind";
        } else if (frequency[0] === 2 && frequency[1] === 2) {
            handID = "twopair";
            hand = "Two Pair";
        } else if (frequency[0] === 2) {
            handID = "onepair";
            hand = "One Pair";
        } else {
            handID = "nomatch";
            hand = "No Match";
        }
    }

    renderDiamonds(diamonds);

    console.log(hand);
}*/

function detectHand(diamonds) {
    let counts = {};
    for (let i of diamonds) {
        counts[i] = (counts[i] || 0) + 1;
    }

    let frequency = Object.values(counts).sort((a, b) => b - a);

    if (frequency[0] === 5) return "fiveofakind";
    if (frequency[0] === 4) return "fourofakind";
    if (frequency[0] === 3 && frequency[1] === 2) return "fullhouse";
    if (frequency[0] === 3) return "threeofakind";
    if (frequency[0] === 2 && frequency[1] === 2) return "twopair";
    if (frequency[0] === 2) return "onepair";
    return "nomatch";
}

function renderDiamond(i) {
    const diamondColor = ["red", "yellow", "green", "cyan", "blue", "pink", "purple"][diamonds[i] - 1];
    const diamond = document.createElement("div");
    diamond.classList = "diamond " + diamondColor;
    document.getElementById("diamondBaseContainer" + (i + 1)).appendChild(diamond);
}

function renderDiamondHand(hand) {
    document.querySelectorAll('.diamondsHand').forEach(element => { element.style.border = "solid var(--grey-600) 2.5px"; });
    document.getElementById(hand).style.border = "solid var(--grey-200) 2.5px";
}

/*function renderDiamonds(diamonds) {
    let colour;
    let diamond;

    document.querySelectorAll(".diamond").forEach(element => element.remove());

    for (let i = 0; i < 5; i++) {
        // decide colour

        switch (diamonds[i]) {
            case 1:
                colour = "red";
                break;

            case 2:
                colour = "yellow";
                break;

            case 3:
                colour = "green";
                break

            case 4:
                colour = "cyan";
                break;

            case 5:
                colour = "blue";
                break;

            case 6:
                colour = "pink";
                break;

            case 7:
                colour = "purple";
                break;
        }

        diamond = document.createElement("div");
        diamond.classList = "diamond " + colour;
        document.getElementById("diamondBaseContainer" + (i + 1)).appendChild(diamond);
    }
}*/