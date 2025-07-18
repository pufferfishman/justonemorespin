// 7 diamond colours:
// red yellow green cyan blue purple pink
let diamonds = [];
let currentIndex = 0;
let betInterval;
let diamondRenderDelay = 200;
let autobetDelay = 2000;
let autobetInterval = null;
let betInput = document.getElementById("betInput");

document.getElementById("autobet").addEventListener("click", () => {
    if (autobetInterval !== null) {
        // Stop autobetting
        clearInterval(autobetInterval);
        autobetInterval = null;
        document.getElementById("autobet").innerText = "Start Autobet";
    } else {
        // Start autobetting
        bet(); // run first bet immediately
        autobetInterval = setInterval(() => {
            bet();
        }, (diamondRenderDelay * 5) + 1000);
        document.getElementById("autobet").innerText = "Stop Autobet";
    }
});


function bet() {
    diamonds = [];
    currentIndex = 0;
    currentBet = betInput.value;

    if (!(parseFloat(currentBet) <= parseFloat(getCookie("balance")) && parseFloat(currentBet) > 0)) {
        alert("error");
        return;
    }

    // clear all diamond element;
    document.querySelectorAll(".diamond").forEach(element => element.remove());

    // reset the highlighted hand
    renderDiamondHand("nomatch");

    // continued generating one diamond every half second
    betInterval = setInterval(() => {
        // stop generating diamonds after 5 iterations
        if (currentIndex >= 5) {
            console.log("bet " + currentBet);
            renderBetOutcome(currentBet, detectHand(diamonds))
            clearInterval(betInterval);
            console.log("interval stopped");
            return;
        }

        addDiamond(currentIndex);
     
        // increment index
        currentIndex++;
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
}

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

function renderBetOutcome(bet, hand) {
    let multiplier;
    let payout;
    let display;
    bet = parseFloat(bet);

    switch (hand) {
        case ("fiveofakind"):
            multiplier = 50;
            break;
        case ("fourofakind"):
            multiplier = 5;
            break;
        case ("fullhouse"):
            multiplier = 4;
            break;
        case ("threeofakind"):
            multiplier = 3;
            break;
        case ("twopair"):
            multiplier = 2;
            break;
        case ("onepair"):
            multiplier = 0.1;
            break;
        case ("nomatch"):
            multiplier = 0;
            break;
    }

    // calculate payout and round to .00
    payout = (Math.round((bet * multiplier) * 100) / 100);
    console.log("bet, multi, payout are ", bet, multiplier, payout);
    // calculate whether or not the bet was won or lost
    let outcome = (multiplier >= 1);

    display = parseFloat(payout).toFixed(2);

    // change the balance to the appropriate value
    balance(bet, display);

    let multiText = document.getElementById("betOutcomeMulti");
    let payoutText = document.getElementById("betOutcomePayout");
}