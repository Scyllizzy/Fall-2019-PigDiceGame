function generateRandomValue(minValue, maxValue) {
    var min = Math.ceil(minValue);
    var max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min)) + min;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current");
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName.innerHTML == player1Name) {
        currentPlayerName.innerHTML = player2Name;
    }
    else {
        currentPlayerName.innerHTML = player1Name;
    }
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
    clearErrors();
    var isValid = true;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (player1Name.trim() == "" || player1Name == null) {
        displayError("Player 1", "span1");
        isValid = false;
    }
    if (player2Name.trim() == "" || player2Name == null) {
        displayError("Player 2", "span2");
        isValid = false;
    }
    return isValid;
}
function clearErrors() {
    var spans = document.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
        spans[i].innerHTML = "";
    }
}
function displayError(player, spanID) {
    document.getElementById(spanID).innerHTML = "You must enter a name for " + player + ".";
}
function resetScores() {
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    resetDieAndTotal();
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    var dieRoll = generateRandomValue(1, 7);
    if (dieRoll == 1) {
        changePlayers();
        currTotal = 0;
    }
    else {
        currTotal += dieRoll;
    }
    displayDieRoll(dieRoll);
    displayCurrTotal(currTotal);
}
function displayCurrTotal(currTotal) {
    document.getElementById("total").value = currTotal.toString();
}
function displayDieRoll(dieRoll) {
    document.getElementById("die").value = dieRoll.toString();
}
function holdDie() {
    var turnTotal = parseInt(document.getElementById("total").value);
    var currplayer = document.getElementById("current").innerHTML;
    var player1 = document.getElementById("player1").value;
    if (currplayer == player1) {
        addTotalToScore(turnTotal, "score1");
    }
    else {
        addTotalToScore(turnTotal, "score2");
    }
    resetDieAndTotal();
    if (didEitherPlayerWin()) {
        gameOver();
    }
    else {
        changePlayers();
    }
}
function whoWon() {
    var player1Score = parseInt(document.getElementById("score1").value);
    var player2Score = parseInt(document.getElementById("score2").value);
    if (player1Score >= 100) {
        return document.getElementById("player1").value;
    }
    if (player2Score >= 100) {
        return document.getElementById("player2").value;
    }
}
function didEitherPlayerWin() {
    var player1Score = parseInt(document.getElementById("score1").value);
    var player2Score = parseInt(document.getElementById("score2").value);
    if (player1Score >= 100 || player2Score >= 100) {
        return true;
    }
}
function gameOver() {
    displayWinner();
    resetForm();
}
function resetForm() {
    document.getElementById("form").reset();
    document.getElementById("turn").classList.remove("open");
    document.getElementById("player1").disabled = false;
    document.getElementById("player2").disabled = false;
}
function displayWinner() {
    var winner = whoWon();
    alert(winner + " won!");
}
function resetDieAndTotal() {
    document.getElementById("total").value = "0";
    document.getElementById("die").value = "";
}
function addTotalToScore(turnTotal, scoreID) {
    var score = document.getElementById(scoreID);
    var scoreValue = parseInt(score.value);
    scoreValue += turnTotal;
    score.value = scoreValue.toString();
}
