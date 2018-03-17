// alert("Test");
// Split in 3 sections 
// GLOBAL VARIABLES
//---------------------------------------------------------------------
// Arrays and variables for holding data
var wordOptions = ["blondie", "devo", "ramones", "misfits", "nirvana", "fugazi"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; // create an array i.e. j _ _ _ _ _ _ _ _
var wrongLetters = [];
// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;
//FUNCTIONS (Reusable blocks of code that i will use when needed)
//---------------------------------------------------------------------------
// "function" keyword, followed by a "name", followed by parentheses 
// The code to be executed, by the function, is placed inside curly brackets:{}
function startGame() {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;
	// Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];
	// Populate blanks and successes with right number of blanks.
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
		// Testing/Debugging
		console.log(selectedWord);
		console.log(lettersinWord);
		console.log(numBlanks);
		console.log(blanksAndSuccesses);
	}
	// Change HTML to reflect game round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;
}

function checkLetters(letter) {
	// check if letter exists in code at all
	var isLetterInWord = false;
	for (var i = 0; i < numBlanks; i++) {
		if (selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}
	// check where in word letter exits, then populate out blanksAndSuccesses array.
	if (isLetterInWord) {
		for (var i = 0; i < numBlanks; i++) {
			if (selectedWord[i] == letter) {
				// console.log("TEST");
				blanksAndSuccesses[i] = letter;
			}
		}
	}
	// Letter not found
	else {
		wrongLetters.push(letter);
		guessesLeft--
	}
	// Testing and Debugging
	// console.log(blanksAndSuccesses);
}

function roundComplete() {
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);
	// last step update HTML to reflect the most recent guesses
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
	// Check if user won
	if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won");
		// Update the win counter in HTML
		document.getElementById("winCounter").innerHTML = winCount;
		startGame();
	}
	// Check if user lost
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You Lost!");
		// Update HTML
		document.getElementById("lossCounter").innerHTML = lossCount;
		startGame();
	}
}
// MAIN PROCESS
// -----------------------------------------
startGame();
// Register keyclicks
document.onkeyup = function (event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
	// Testing / Debugging
	console.log(letterGuessed);
}