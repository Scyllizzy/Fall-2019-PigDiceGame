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
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
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
