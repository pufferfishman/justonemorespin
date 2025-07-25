# Just One More Spin
This project is a fake simulator of a typical online casino, specifically Stake.com.

## Disclaimer:
This site is not for promoting or encouraging gambling. It is a coding project for entertainment purposes, and to raise awareness about the dangers of gambling. 

This site does not use real money, only fake currency that can be replenished for free. 
In every casino game, the house has at least a 1% edge over the player. In an online casino, this edge is usually 1-3% for all games. 
You may have temporary wins, but in the long run, probability states that the house will always win.

For example, in roulette, if you put it all in on red or black, it's not exactly a 50% chance to win. 
The 0 on the roulette wheel gives the house a 2.6% edge, which means the player will only win 47.4% of the time instead of 50%. 

There is no strategy that can be used to gain an edge over the house, they will always win in every game more than 50% of the time. Please don't gamble with real money, you will always lose.

# Plans for this Site

My plan is for Just One More Spin to be a full clone of the Stake.com online casino.
I'm programming all the games one by one, and I will update this README whenever I finish a new game.

So far, the only game is Diamonds, which is why the main page of the website is the Diamonds game. 
This game is fully playable on its own, but when I add new games I will also add a home page where you can see all the games with links to their pages.

[Link to project](https://pufferfishman.github.io/justonemorespin/)

<img width="1000" height="800" alt="Screenshot 2025-07-24 192522" src="https://github.com/user-attachments/assets/1e05d971-6bf5-453e-a06d-b1a94c0efd2f" />

## Diamonds
This game is very simple, you just put in a bet, and press the button.

Time to make: 15 hours

House edge: 1.71%

### How to Play

When you press bet, it generates 5 diamonds each with 1 of 7 random colors. There are 7 different poker hands that you can make by having the diamonds match colors.

The higher ranking and more rare your hand is, the more your bet gets multiplied. If you get a No Match, which means all your diamonds are different, you lose all of your bet. If you get a One Pair, you get 1/10th of your bet back, but still lose money.

Only hands that are Two Pair or higher make a profit.

### How I Made it

I started out by finding the Stake.com color scheme, and I began replicating the basic layout of the site with HTML and CSS.

Then, I added some elements and styling for the diamonds and diamond hands, as well as fixing up the layout.

Next, I shifted my focus to the actual gameplay. I wrote some JS to generate the diamonds randomly, then render them on the page with their appropriate color.

I added some more styling and some animation for the diamonds and diamond hands, making them animate into position.

Now that the CSS was in good shape, I went back to JS to implement the multipliers, payouts, highlighting diamond hands, bet functionality, and much more. 

This was by far the hardest part, and I spent hours fixing all the bugs and getting all the features to work as intended. I also tried to add browser cookies to save your balance, but it didn't work and I put it to the side.

Now that the bulk of the work was done, I added some quality of life features such as buttons to half or double your bet, and even the option to go all in.

Then, I started testing for bugs, and found some catastrophic mistakes in my code. I spent a long time getting everything to work properly. I added some error messages, fixed the disabling and enabling of the bet buttons, and more.

Lastly, I finished it off by fixing up the browser cookie code from before, adding a reset button to reset your balance, and some other minor bug fixes.

Made with ❤️ by 🐡
