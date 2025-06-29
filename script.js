'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //bit faster than first 
const current0El = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const btnRoll = document.querySelector('.btn--roll')

let scores, currentScore, activePlayer, playing;
//starting conditions

const init = function(){
  
   scores = [0, 0]; //these variables are only available inside init function (declared for init function so cannot be accesed)
   currentScore = 0; 
   activePlayer = 0;
   playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent= 0;
  currentEl1.textContent= 0;
  diceEl.classList.add('hidden');
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); //run the function so all the content should work

const switchPlayer = function(){
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   player0El.classList.toggle('player--active') // toggle :if present then remove, if not present then add 
   player1El.classList.toggle('player--active')
}
//startign conditons

btnRoll.addEventListener('click', function(){
  if (playing){
  //1.generating random dice roll
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  //2. display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceRoll}.png` //change in src element 
  //3. check for rolled 1: if true switch to next player.
  if(diceRoll !== 1){
   // Add dice to the current score
   currentScore += diceRoll;
   document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
   // Switch to next player 
   switchPlayer();
  }
 }


})

btnHold.addEventListener('click', function(){
  if (playing){
   //1. add current score to active players score
  scores[activePlayer] += currentScore;
  //scores[1] = scores[1] + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  // 2. check if player's score is >= 100
  if(scores[activePlayer] >= 100){
  // finish the game
    playing = false;
    diceEl.classList.add('hidden');

    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      
  } else {
     //switch to the next player
     switchPlayer();
  }
 }
 
});

btnNew.addEventListener('click', init);


