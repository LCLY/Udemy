/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// testing

var scores, roundScore, activePlayer, gamePlaying, lastDice;
init();
// console.log(dice);

// DOM manipulation
// to access DOM can use document object

//document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML =
//     "<em>" + dice + "</em>";

// function btn(){
// // do something
// }
// btn();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        //1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        // var diceDOM = document.querySelector(".dice");
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

        if (dice1 !== 1 && dice2 !== 1) {
            // add score
            roundScore += dice1 + dice2;
            document.querySelector(
                "#current-" + activePlayer,
            ).textContent = roundScore;
        } else {
            nextPlayer();
        }
        // if (dice === 6 && lastDice === 6) {
        //     // Player looses score
        //     scores[activePlayer] = 0;
        //     document.querySelector("#score-" + activePlayer).textContent = 0;
        //     nextPlayer();
        // } else if (dice !== 1) {
        //     //3. Update the round if the rolled number was not a 1
        //     //Add score
        //     roundScore += dice;
        //     document.querySelector(
        //         "#current-" + activePlayer,
        //     ).textContent = roundScore;
        // } else {
        //     nextPlayer();
        // }

        // lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore;
        //check undefined, 0, null, "" are coerced to false
        // anything else is true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if player won
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent =
                "Winner!";
            document.getElementById(".dice-1").style.display = "none";
            document.getElementById(".dice-2").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //can also use this to change css
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    // getelementbyid is faster than queryselector
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
