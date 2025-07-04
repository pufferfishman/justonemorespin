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

    console.log(hand);
}