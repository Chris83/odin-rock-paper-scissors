const shoot = ['Rock', 'Paper', 'Scissors'];

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', playRound));

const game = document.querySelector('#game');

function computerPlay() {
   return shoot[Math.floor(Math.random()*3)];
}

function playRound() {
   playerSelection = this.value;
   computerSelection = computerPlay();

  if(game.childElementCount >= 7) startNewGame();

   let results = ''
   if( computerSelection === playerSelection) {
      results = `You tied that round! ${playerSelection} ties with ${computerSelection}`;
   } else if (playerSelection === "Rock" && computerSelection === "Scissors" 
               || playerSelection === "Paper" && computerSelection === "Rock" 
               || playerSelection === "Scissors" && computerSelection === "Paper") {
       results = `You won that round! ${playerSelection} beats ${computerSelection}`;
   } else {
      results = `You lost that round! ${playerSelection} loses to ${computerSelection}`;
   }

   calculateScore(results);

   const pResult = document.createElement('p');
   pResult.textContent = results;
   game.appendChild(pResult);
}

function calculateScore(result){
   const regExWin = /won/;
   const regExLoss = /lost/;

   if(regExWin.test(result)) {
      updateScore('wins');
   } else if(regExLoss.test(result)) {
      updateScore('losses');
   } else {
      updateScore('ties');
   }
}

function updateScore(result){
   const score = document.querySelector(`.${result}`);
   score.textContent = Number.parseInt(score.textContent) + 1;

   const gameCount = document.querySelector('.winner');
   gameCount.dataset.gamecount = Number.parseInt(gameCount.dataset.gamecount) + 1;
   if(gameCount.dataset.gamecount == 5) {
      announceWinner();
   }
}

function announceWinner() {
   const wins = Number.parseInt(document.querySelector('.wins').textContent);
   const losses = Number.parseInt(document.querySelector('.losses').textContent);

   const pWinner = document.querySelector('.winner');

   if(wins > losses){
      pWinner.textContent = "YOU ARE THE CHAMPION!!!";
   } else if (losses > wins) {
      pWinner.textContent = "You lost, better luck next time."
   } else {
      pWinner.textContent = "You both win? or lost... Looks like a tie to me."
   }
}

function startNewGame() {
   game.innerHTML = '<p class="winner" data-gamecount="0"></p>' +
   '<p>Wins: <span class="wins">0</span> Losses: <span class="losses">0</span> Ties: <span class="ties">0</span></p>';
}