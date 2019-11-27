/**
 * Generates a random number between the min and max value.
 * Min is inclusive.
 * Max is exclusive.
 * @param minValue Minimum value for randomly generated number inclusive.
 * @param maxValue Maximun value for randomly generated number exclusive.
 */
function generateRandomValue(minValue:number, maxValue:number):number{
    let min = Math.ceil(minValue);
    let max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Switches the players turn.
 */
function changePlayers():void{
    let currentPlayerName = document.getElementById("current");
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName.innerHTML == player1Name) {
        currentPlayerName.innerHTML = player2Name;
    }
    else {
        currentPlayerName.innerHTML = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    resetScores();

    //verify each player has a name
    if (arePlayerNamesPresent()) {
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";

        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }    
}

/**
 * Checks if both player 1 and player 2 have input in their textboxes.
 */
function arePlayerNamesPresent():boolean {
    clearErrors();
    let isValid = true;

    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //if both players don't have a name display error
    if (player1Name.trim() == "" || player1Name == null) { //Simulate isNullOrWhiteSpace from C# because I like that particular method.
        displayError("Player 1", "span1");
        isValid = false;
    }

    if (player2Name.trim() == "" || player2Name == null) {
        displayError("Player 2", "span2");
        isValid = false;
    }

    return isValid;
}

/**
 * Clears the span error messages displayed on the form.
 */
function clearErrors():void {
    let spans = document.querySelectorAll("span");

    for (let i = 0; i < spans.length; i++) {
        spans[i].innerHTML = "";
    }
}

/**
 * Displays an error for the player with an invalid name in a span element.
 * @param player The player that has an invalid name.
 * @param spanID The ID of the span for the error to display in.
 */
function displayError(player:string, spanID:string):void {
    document.getElementById(spanID).innerHTML = "You must enter a name for " + player + ".";
}

/**
 * Resets all the scores back to its original state.
 */
function resetScores():void {
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";
    resetDieAndTotal();
}

/**
 * Rolls the die, displays the die roll, and adds die roll to the current total.
 */
function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let dieRoll = generateRandomValue(1, 7); //max is exclusive, min is inclusive

    //if the roll is 1
    if (dieRoll == 1) {
        //change players
        changePlayers();
        //set current total to 0
        currTotal = 0;
    }
    else { //if the roll is greater than 1
        //add roll value to current total
        currTotal += dieRoll;
    }
    
    displayDieRoll(dieRoll);
    displayCurrTotal(currTotal);
}

/**
 * Displays current total on form.
 * @param currTotal The current total the user has accumulated.
 */
function displayCurrTotal(currTotal: number):void {
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

/**
 * Sets the die roll to value player rolled.
 * @param dieRoll The number the die rolled.
 */
function displayDieRoll(dieRoll: number):void {
    (<HTMLInputElement>document.getElementById("die")).value = dieRoll.toString();
}

/**
 * Adds the total accumulated from the turn and adds it to the total score.
 * Resets the die and total.
 * Checks if anybody won.
 */
function holdDie():void{
    //get the current turn total
    let turnTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is
    let currplayer = document.getElementById("current").innerHTML;
    let player1 = (<HTMLInputElement>document.getElementById("player1")).value;

    if (currplayer == player1) { //add the current turn total to the player's total score
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

/**
 * Figures out who won and return the winners name.
 */
function whoWon():string {
    let player1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let player2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    if (player1Score >= 100) {
        return (<HTMLInputElement>document.getElementById("player1")).value;
    }
    if (player2Score >= 100) {
        return (<HTMLInputElement>document.getElementById("player2")).value;
    }
}

/**
 * Checks if either player's score is at or above 100.
 * Returns true if so, returns false if not.
 */
function didEitherPlayerWin():boolean {
    let player1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let player2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    //check if player1's score > 100
    if (player1Score >= 100 || player2Score >= 100) {
        return true;
    }
}

/**
 * Displays a winner and resets the form back to where players can now re-enter their name.
 */
function gameOver():void {
    displayWinner();
    resetForm();
}

/**
 * Resets the form back to its original state.
 * Players can now re-enter their name.
 */
function resetForm():void {
    (<HTMLFormElement>document.getElementById("form")).reset();
    document.getElementById("turn").classList.remove("open");
    (<HTMLInputElement>document.getElementById("player1")).disabled = false;
    (<HTMLInputElement>document.getElementById("player2")).disabled = false;
}

/**
 * Displays the winner of the game in an alert box.
 */
function displayWinner() {
    let winner = whoWon();
    alert(winner + " won!");
}

/**
 * Resets the turn total to 0 and die display to an empty string.
 */
function resetDieAndTotal():void {
    (<HTMLInputElement>document.getElementById("total")).value = "0";
    (<HTMLInputElement>document.getElementById("die")).value = "";
}

/**
 * Adds the total accumulated from the turn to the current players total.
 */
function addTotalToScore(turnTotal:number, scoreID:string):void {
    let score = <HTMLInputElement>document.getElementById(scoreID); //Grab score element
    let scoreValue = parseInt(score.value); //Take the num and parse it

    scoreValue += turnTotal; //Add the turn total to the scoreValue
    score.value = scoreValue.toString(); //Put the score value into the textbox
}
