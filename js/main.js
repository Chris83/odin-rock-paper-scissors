const shoot = ['Rock', 'Paper', 'Scissors'];

function computerPlay() {
   return shoot[Math.floor(Math.random()*3)];
}

function playerPlay() {
   playerSelection = prompt("Are you shooting Rock, Paper, or Scissors?", "");

   // Format the players input to equal "Rock", "Paper", or "Scissors"
   return playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
   if( computerSelection == playerSelection) {
      return `You tied! ${playerSelection} ties with ${computerSelection}`;
   } else if (playerSelection == "Rock" && computerSelection == "Scissors" 
               || playerSelection == "Paper" && computerSelection == "Rock" 
               || playerSelection == "Scissors" && computerSelection == "Paper") {
      return `You win! ${playerSelection} beats ${computerSelection}`;
   } else {
      return `You lost! ${playerSelection} loses to ${computerSelection}`;
   }
}

function game() {
   const rounds = 5;
   let score = {wins: 0, losses: 0, ties: 0};

   for(let i=0; i<rounds; i++) {
      let result = playRound(playerPlay(), computerPlay());
      score =  calculateScore(result, score);
      console.log(result);
   }
   
   console.log(`Your Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`);

   if(confirm("Would you like to play again?")) game();
}

function calculateScore(result, score){
   const regExWin = /win/;
   const regExLoss = /lose/;

   if(regExWin.test(result)) {
      score.wins++;
      return score;
   } else if(regExLoss.test(result)) {
      score.losses++;
      return score;
   } else {
      score.ties++;
      return score;
   }

   return score;
}