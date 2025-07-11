// 7 diamond colours:
// red yellow green cyan blue purple pink

let diamonds;

function bet() {
    // clear diamonds
    diamonds = [];

    // generate diamonds
    for (let i = 0; i < 5; i++) {
        diamonds.push(Math.floor(Math.random() * 7) + 1);
    }

    console.log(diamonds);

    // form diamond counts
    let counts = {};

    for (let i of diamonds) {
        counts[i] = (counts[i] || 0) + 1;
    }

    console.log(counts);

    // sort the counts by most to least
    let frequency = Object.values(counts).sort((a, b) => b - a);

    console.log(frequency);

    // detect which hand the diamonds make
    let hand;

    if (frequency[0] === 5) {
        hand = "Five of a Kind";
    } else if (frequency[0] === 4) {
        hand = "Four of a Kind";
    } else if (frequency[0] === 3 && frequency[1] === 2) {
        hand = "Full House";
    } else if (frequency[0] === 3) {
        hand = "Three of a Kind";
    } else if (frequency[0] === 2 && frequency[1] === 2) {
        hand = "Two Pair";
    } else if (frequency[0] === 2) {
        hand = "One Pair";
    } else {
        hand = "No Match";
    }

    renderDiamonds(diamonds, hand);

    console.log(hand);
}

function renderDiamonds(diamonds, hand) {
    let colour;
    let diamond;

    for (let i = 0; i < 5; i++) {
        // decide colour

        switch(diamonds[i]) {
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
        document.getElementById("diamondBaseContainer" + (i+1)).appendChild(diamond);
    }
}