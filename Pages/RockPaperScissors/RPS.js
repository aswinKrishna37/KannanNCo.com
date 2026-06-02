// DOM Elements
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resetScoresBtn = document.getElementById('resetScoresBtn');
const gameImage = document.getElementById('gameImage');
const gameStatus = document.getElementById('gameStatus');
const choiceButtons = document.querySelectorAll('.choice-btn');

// Choices configuration
const choices = ['rock', 'paper', 'scissors'];
const imagePaths = {
    'default': 'Assets/Athul-Scissors.png',
    'rock_happy': 'Assets/Athul-Stone.png',
    'rock_sad': 'Assets/Athul-Stone.png',
    'paper_happy': 'Assets/Athul-Paper.png',
    'paper_sad': 'Assets/Athul-Paper.png',
    'scissors_happy': 'Assets/Athul-Scissors.png',
    'scissors_sad': 'Assets/Athul-Scissors.png'
};

// Load scores from localStorage
let playerScore = parseInt(localStorage.getItem('rps_playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('rps_computerScore')) || 0;

// Initialize scoreboard display
updateScoreboard();

// Attach click listener to choice buttons
choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.getAttribute('data-choice');
        playRound(playerChoice);
    });
});

// Reset scores listener
resetScoresBtn.addEventListener('click', resetScores);

// Main Game Logic
function playRound(playerChoice) {
    // Disable choice buttons during animation
    setButtonsDisabled(true);

    // Reset and apply shake animation to the image
    gameImage.classList.remove('shake-img');
    // Force reflow to restart animation
    void gameImage.offsetWidth;
    
    gameImage.src = imagePaths['default'];
    gameImage.classList.add('shake-img');
    
    gameStatus.textContent = "Athulraj is playing...";

    // Wait for animation to finish (500ms)
    setTimeout(() => {
        // Generate computer choice
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        // Remove shake animation class
        gameImage.classList.remove('shake-img');

        // Determine game result and Athulraj's emotion state
        let resultText = '';
        let state = 'happy'; // Default happy state for computer

        if (playerChoice === computerChoice) {
            resultText = `Oooo pwoli! It's a Tie! Both played ${capitalize(playerChoice)}.`;
            state = 'happy'; // Athulraj is happy with a tie
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            playerScore++;
            resultText = `Shey pwoli! You Win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
            state = 'sad'; // Athulraj lost, so he is sad
        } else {
            computerScore++;
            resultText = `Yeee pwoli! I Won! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
            state = 'happy'; // Athulraj won, so he is happy
        }

        // Display corresponding image for Athulraj's played hand + mood state
        const imageKey = `${computerChoice}_${state}`;
        gameImage.src = imagePaths[imageKey];

        // Save and update scores
        saveScores();
        updateScoreboard();

        // Display result
        gameStatus.textContent = resultText;

        // Re-enable choice buttons
        setButtonsDisabled(false);

    }, 500);
}

// Helper functions
function updateScoreboard() {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

function saveScores() {
    localStorage.setItem('rps_playerScore', playerScore);
    localStorage.setItem('rps_computerScore', computerScore);
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    saveScores();
    updateScoreboard();
    
    gameImage.src = imagePaths['default'];
    gameStatus.textContent = "Scores reset! Make your move to start over.";
}

function setButtonsDisabled(disabled) {
    choiceButtons.forEach(btn => {
        btn.disabled = disabled;
        if (disabled) {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.6';
        } else {
            btn.style.pointerEvents = 'auto';
            btn.style.opacity = '1';
        }
    });
}

// Capitalize choices for message text
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
