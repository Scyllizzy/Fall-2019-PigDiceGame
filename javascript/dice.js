function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    resetScores();
    if (arePlayerNamesPresent()) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function arePlayerNamesPresent() {
    var isValid = true;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (player1Name.trim() == "" || player1Name == null) {
        displayError("Player 1");
        isValid = false;
    }
    if (player2Name.trim() == "" || player2Name == null) {
        displayError("Player 2");
        isValid = false;
    }
    return isValid;
}
function displayError(player) {
    alert("You must enter a name for " + player + ".");
}
function resetScores() {
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
}
function holdDie() {
    changePlayers();
}
