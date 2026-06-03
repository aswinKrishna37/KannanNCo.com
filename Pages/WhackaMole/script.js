const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');
const selectionScreen = document.getElementById('selection-screen');
const gameScreen = document.getElementById('game-screen');

let lastHole;
let timeUp = false;
let score = 0;

function selectCharacter(imageSrc) {
  moles.forEach(mole => {
    mole.style.backgroundImage = `url('${imageSrc}')`;
  });

  selectionScreen.style.display = 'none';
  gameScreen.style.display = 'block';

  startGame();
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if(hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(250, 1000); 
  const hole = randomHole(holes);
  const mole = hole.querySelector('.mole');
  
  // Reset stun condition before popping up
  mole.classList.remove('clicked');
  
  hole.classList.add('up');
  
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  button.style.visibility = 'hidden';
  peep();
  setTimeout(() => {
    timeUp = true;
    button.innerHTML = 'Change Target / Replay?';
    button.style.visibility = 'visible';
    
    button.onclick = () => {
      gameScreen.style.display = 'none';
      selectionScreen.style.display = 'block';
    };
  }, 10000);
}

function bonk(e) {
  if(!e.isTrusted) return; // Anti-cheat
  
  // If this mole was already whacked during this pop-up window, block additional points
  if(this.classList.contains('clicked')) return;
  
  score++;
  this.classList.add('clicked'); // Triggers stun image in CSS
  
  // Optional: If you want them to drop instantly upon being hit instead of waiting for the timer, 
  // you can uncomment the line below:
  // this.parentNode.classList.remove('up');
  
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('pointerdown', bonk));