// 7 diamond colours:
// red yellow green cyan blue purple pink
let diamonds = [];
let currentIndex = 0;
let betInterval;
let diamondRenderDelay = 200;
let autobetDelay = 2000;
let autobetInterval = null;
let betInput = document.getElementById("betInput");
let betButton = document.getElementById("bet");
let autoBet = document.getElementById("autobet");
let isAutobetting = false;
let currentBet = null;
let autobetStopping = false;

document.getElementById("balance").innerHTML = "$" + getCookie("balance");

autoBet.addEventListener("click", () => {
    currentBet = betInput.value;
    if (autobetInterval !== null) {
        // Stop autobetting
        clearInterval(autobetInterval);
        isAutobetting = false;
        autobetInterval = null;
        autoBet.innerText = "Start Autobet";
        autobetStopping = true;
    } else {
        // Start autobetting
        if (!(parseFloat(currentBet) <= parseFloat(getCookie("balance")) && parseFloat(currentBet) > 0)) {
            alert("Enter a valid bet. Your bet must be within your balance. Your bet must be a number between $1 and $1,000,000 and can only have up to 2 decimal digits.");
            return;
        }
        isAutobetting = true;
        betButton.disabled = true;
        bet(true); // run first bet immediately
        autobetInterval = setInterval(() => {
            bet(true);
        }, (diamondRenderDelay * 5) + 1000);
        autoBet.innerText = "Stop Autobet";
    }
});


function bet(autobet) {
    diamonds = [];
    currentIndex = 0;
    currentBet = betInput.value;

    if (!(parseFloat(currentBet) <= parseFloat(getCookie("balance")) && parseFloat(currentBet) > 0)) {
        /*if (autobet) {
            clearInterval(autobetInterval);
            isAutobetting = false;
            autobetInterval = null;
            autoBet.innerText = "Start Autobet";
            betButton.disabled = false;
            return;
        }*/
        alert("Enter a valid bet. Your bet must be within your balance. Your bet must be a number between $1 and $1,000,000 and can only have up to 2 decimal digits.");
        return;
    }

    betButton.disabled = true;
    if (!autobet) {
        autoBet.disabled = true;
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
            renderBetOutcome(currentBet, detectHand(diamonds), autobet)
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

function renderBetOutcome(bet, hand, autobet) {
    let multiplier;
    let payout;
    let display;
    bet = parseFloat(bet).toFixed(2);

    if (!autobet || !isAutobetting) {
        betButton.disabled = false;
        autoBet.disabled = false;
    }
    
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

    // change the bet outcome box to the right values and color
    let betOutcomeBorder = document.getElementById("betOutcome");
    let multiText = document.getElementById("betOutcomeMulti");
    let payoutText = document.getElementById("betOutcomePayout");
    multiText.innerHTML = multiplier + "×";
    payoutText.innerHTML = "$" + bet + "<br>🡓<br>$" + display;
    
    if (outcome) {
        betOutcomeBorder.classList = "betOutcome betOutcomeWin";
        multiText.classList = "bigFont betOutcomeText greenText";
        payoutText.classList = "betOutcomeText greenText";
    } else {
        betOutcomeBorder.classList = "betOutcome betOutcomeLoss";
        multiText.classList = "bigFont betOutcomeText redText";
        payoutText.classList = "betOutcomeText redText";
    }

    // change the balance to the appropriate value
    balance(bet, display);

    if (autobet) {
    const newBalance = parseFloat(getCookie("balance"));
    const betAmount = parseFloat(betInput.value);

    if (betAmount > newBalance || betAmount <= 0) {
        clearInterval(autobetInterval);
        autobetInterval = null;
        autoBet.innerText = "Start Autobet";
        isAutobetting = false;
        autobetStopping = true;

        alert("Autobet stopped: balance too low for next bet.");
    }

    if (autobetStopping) {
        isAutobetting = false;
        autobetStopping = false;
        betButton.disabled = false;
        autoBet.disabled = false;
        return;
    }
}

}

function changeBet(change) {
    if (change == "allin") {
        betInput.value = parseFloat(getCookie("balance")).toFixed(2);
        return;
    }

    if (!(parseFloat(betInput.value) > 1 && parseFloat(betInput.value) > 1)) {
        alert("Enter a valid bet amount. Your bet has to be a positive number with no more than 2 decimal digits.")
        return;
    }

    if (change == "half") {
        if (parseFloat(betInput.value) < 1) {
            alert("Enter a valid bet amount. Bets under $1 can't be halved.")
            return;
        }

        betInput.value = (betInput.value / 2).toFixed(2);

    } else if (change == "double") {
        if (parseFloat(betInput.value) > 1000000) {
            alert("Enter a valid bet amount. Bets over $1,000,000 can't be doubled.")
            return;
        }

        betInput.value = (betInput.value * 2).toFixed(2);
    }
}

function betInputUnfocus() {
    betInput.value = (parseFloat(betInput.value).toFixed(2)).toString();
}

function formatBet() {
    this.value = this.value.replace(/[^0-9.]/g, '');

    const parts = this.value.split('.');
    if (parts.length > 2) {
        this.value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1]) {
        parts[1] = parts[1].slice(0, 2); // keep only two digits after dot
        this.value = parts[0] + '.' + parts[1];
    }

}