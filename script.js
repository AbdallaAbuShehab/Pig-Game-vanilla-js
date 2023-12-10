'use strict';

// Selection element
const score1El = document.querySelector('#score--1');
const score0El = document.querySelector('#score--0');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting condition

const intalValue = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
intalValue();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1- Generating a random dice roll
    const diceRandom = Math.trunc(Math.random() * 6 + 1);

    // 2- display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRandom}.png`;

    // 3- Cheek for rolling 1
    if (diceRandom !== 1) {
      // Add dice to current score
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch next player
      switchPlayer();
    }
  }
});

// Holding score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. cheek if player's score is >=100

    // Finsh the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', intalValue);
