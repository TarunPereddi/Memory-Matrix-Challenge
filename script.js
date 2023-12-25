// Declarations
let sequence = [],
    userSequence = [],
    level = 0,
    score = 0,
    highScore = 0;

// Function to start the game
function startGame() {
    // Initialization
    sequence = [];
    userSequence = [];
    level = 1;
    score = 0;
    
    // Update UI
    document.getElementById('level').textContent = 'Level: ' + level;
    document.getElementById('restart').style.display = 'none';
    updateScore();
    
    // Generate and show sequence
    generateSequence();
    showSequence();
}

// Function to generate a random sequence
function generateSequence() {
    sequence.push(Math.floor(Math.random() * 9) + 1);
}

// Function to show the generated sequence
function showSequence() {
    disableUserInput();
    sequence.forEach((num, index) => {
        setTimeout(() => {
            highlightSquare(num);
        }, 1000 * (index + 1));
    });
    setTimeout(enableUserInput, 1000 * sequence.length + 500);
}

// Function to disable user input
function disableUserInput() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleUserClick);
        cell.classList.add('no-click');
    });
}

// Function to enable user input
function enableUserInput() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleUserClick);
        cell.classList.remove('no-click');
    });
}

// Function to handle user click
function handleUserClick(event) {
    userSequence.push(parseInt(event.target.id));
    if (!checkSequence()) {
        endGame();
    } else if (userSequence.length === sequence.length) {
        nextLevel();
    }
}

// Function to check user sequence against generated sequence
function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

// Function to end the game
function endGame() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('restart').style.display = 'block';
    highScore = Math.max(score, highScore);
    updateHighScore();
    disableUserInput();
}

// Function to move to the next level
function nextLevel() {
    level++;
    document.getElementById('level').textContent = 'Level: ' + level;
    score = level - 1;
    updateScore();
    if (score > highScore) {
        highScore = score;
        updateHighScore();
    }
    userSequence = [];
    generateSequence();
    showSequence();
}

// Function to update the score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Function to update the high score display
function updateHighScore() {
    document.getElementById('high-score').textContent = highScore;
}

// Function to highlight a square
function highlightSquare(num) {
    const cell = document.getElementById(num.toString());
    cell.classList.add('highlight');
    setTimeout(() => {
        cell.classList.remove('highlight');
    }, 500);
}

// Function to create a square element
function createSquare(index) {
    const cell = document.createElement('div');
    cell.id = index.toString();
    cell.classList.add('cell');

    // Create a new row for every 3 squares
    if (index % 3 === 1) {
        const row = document.createElement('div');
        row.classList.add('row');
        document.getElementById('game-board').appendChild(row);
    }

    // Append the square to the last row
    const rows = document.getElementsByClassName('row');
    const lastRow = rows[rows.length - 1];
    lastRow.appendChild(cell);
}

// Game Start - Create squares and add event listeners
for (let i = 1; i <= 9; i++) {
    createSquare(i);
}

document.getElementById('level').addEventListener('click', () => {
    if (level > 0) return;
    startGame();
});

document.getElementById('restart').addEventListener('click', () => {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('level').textContent = 'Start Game';
    document.getElementById('score').textContent = 0;
    level = 0;
});
