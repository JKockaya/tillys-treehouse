// --- Class placeholder variables --- //

const ACORN_CLASS = 'acorn';

const STICKS_CLASS = 'sticks'


// ---DOM elements--- //

const squareElements = document.querySelectorAll('[data-square]');

const board = document.getElementById('playArea');

const playerIcon = document.getElementById('turnIcon');

const playerText = document.getElementById('turnText');

const winText = document.querySelector('[data-win-screen-text]');

const winScreen = document.getElementById('winScreen');

const restartBtn = document.getElementById('restartBtn');


// ---Win Conditions--- //

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// ---Initial game state--- //

let sticksTurn;

startGame();

restartBtn.addEventListener('click', startGame); // Runs the start game function



// ---Functions--- //

function startGame() {

    winScreen.classList.remove('show'); // Removes the win screen if present

    sticksTurn = false; // Sets Acorn to be first player.


    // Remove any classes from each cell, reverting them to default state.
    // Removes and reapplies click event listeners to each cell (can only be activated once).
    squareElements.forEach(square => {
        square.classList.remove(STICKS_CLASS);
        square.classList.remove(ACORN_CLASS);
        square.removeEventListener('click', handleClick);
        square.addEventListener('click', handleClick, {once: true});
    })

    setBoardClass();
}


function handleClick(e) {

    const square = e.target;
    const currentClass = sticksTurn ? STICKS_CLASS : ACORN_CLASS;

    placeIcon(square, currentClass);    // Checks current class variable for current class (player)
                                        // and adds that player's class, also inserting that player's
                                        // icon into the cell.

    if (checkWin(currentClass)) {
        endGame(false); // End the game with a win condition
    } else if (isDraw()) {
        endGame(true); // End the game with a draw condition
    } else {
        switchTurns();

        setBoardClass();
    }
}

function placeIcon(square, currentClass) {
    square.classList.add(currentClass); // Adds current player class to cell.
}

function switchTurns() {
    sticksTurn = !sticksTurn;   // If it is Sticks player's turn, reverse variable value to make
                                // it Acorns player's turn.
}

function setBoardClass() {
    board.classList.remove(ACORN_CLASS);       // Remove all class conditions
    board.classList.remove(STICKS_CLASS);

    if(sticksTurn) {        // If true current player icon and text revert to Sticks
        board.classList.add(STICKS_CLASS);
        playerIcon.innerHTML = '<img id="sticks" src="icons/sticks.png" alt="Sticks" draggable="true" ondragstart="onDragStart(event)">';
        playerText.textContent = 'Sticks Turn';
    } else {                // If false current player icon and text revert to Acorns
        board.classList.add(ACORN_CLASS);
        playerIcon.innerHTML = '<img id="acorn" src="icons/acorn.png" alt="Acorns" draggable="true" ondragstart="onDragStart(event)">';
        playerText.textContent = 'Acorns Turn';
    }
}

// Checks the square DOM elements a winning combination. If at least one
// of the combinations in the array (using the array values to correspond with
// the DOM element NodeList) contains all the same class this creates a win condition.
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return squareElements[index].classList.contains(currentClass);
        })
    })
}

// returns true if every square contains a class but no
// winning condition has been met.
function isDraw() {
    return [...squareElements].every(square => {
        return  square.classList.contains(STICKS_CLASS) || 
                square.classList.contains(ACORN_CLASS);
    })
}


function endGame(draw) {
    if (draw) {     // If draw is true show win screen and populate with text.
        winText.textContent = "It's a draw!";
        winScreen.classList.add('show');
    } else {        // If draw is false check player who made the winning move.
        winText.textContent = `${sticksTurn ? "Sticks" : "Acorns"} Win!`;
        winScreen.classList.add('show');
    }
}


// ---Drag and Drop API Functions--- //

function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);  // When element is dragged
}                                                               // its id value will be taken
                                                                // with it and placed where it
                                                                // is dropped.
function onDragOver(event) {
    event.preventDefault(); // Allows element to be dropped into another element.
}

function onDrop(event) {
    handleClick(event); // Acts the same same as click event when icon is dragged onto it.
}