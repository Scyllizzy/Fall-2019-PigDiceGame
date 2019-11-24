function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    //TODO: use random to generate a number between min and max
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    //set player 1 and player 2 scores to 0
    //verify each player has a name
    //if both players don't have a name display error
    //if both players do have a name start the game!
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    //lock in player names and then change players
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    //if the roll is 1
    //  change players
    //  set current total to 0
    //if the roll is greater than 1
    //  add roll value to current total
    //set the die roll to value player rolled
    //display current total on form
}
function holdDie() {
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score
    //reset the turn total to 0
    //change players
    changePlayers();
}
