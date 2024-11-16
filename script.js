let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};
let result = '';
elementUpdate();
// (scoree = NULL)
/*if(!score){
      score:0
      losses:0,
      ties:0
    };
}*/
function pickedByComputer(){
  const randomNumer = Math.random();
  let computerMove = '';
  if(randomNumer>=0 && randomNumer<1/3){
    computerMove = 'rock';
  }else if(randomNumer>=1/3 && randomNumer<2/3){
    computerMove = 'paper';
  }else if(randomNumer>=2/3 && randomNumer<1){
    computerMove = 'scissors';
  }
  return computerMove;
}
function checkWinner(yourMove){
  let computerMove = pickedByComputer();
  if(yourMove === 'rock'){
    if(computerMove === 'rock')
      result='Tie';
    else if(computerMove === 'paper')
      result = 'You lose';
    else if(computerMove === 'scissors')
      result = 'You win';
  }else if(yourMove === 'paper'){
    if(computerMove === 'rock')
      result = 'You win';
    else if(computerMove === 'paper')
      result='Tie';
    else if(computerMove === 'scissors')
      result = 'You lose';
  }else if(yourMove === 'scissors'){
    if(computerMove === 'rock')
      result = 'You lose';
    else if(computerMove === 'paper')
      result = 'You win';
    else if(computerMove === 'scissors')
      result='Tie';
  }
  if(result === 'You win'){
    score.wins += 1;}
  else if(result === 'You lose'){
    score.losses += 1;}
  else if(result === 'Tie'){
    score.ties += 1;}
    
  //storing values of score in local storage which will not be removed on refresh
  localStorage.setItem('score',JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = `${result}.`;
  document.querySelector('.js-move')
  .innerHTML = `You <img src="icons/${yourMove}-emoji.png"  class="move-icon">  
  <img src="icons/${computerMove}-emoji.png" class="move-icon">Computer `;
  elementUpdate();
}
function elementUpdate(){
  document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, Ties : ${score.ties}` ;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){

  if(!isAutoPlaying){
    intervalId = setInterval(function(){
      const playerMove = pickedByComputer();
      checkWinner(playerMove);
    },1000);
    document.querySelector('.js-auto-play-btn').innerHTML = 'Stop Playing';
    isAutoPlaying = true;
    console.log(intervalId);
  } else {
    clearInterval(intervalId);
    document.querySelector('.js-auto-play-btn').innerHTML = 'Auto Play';
    isAutoPlaying = true;
  }
  
}

document.querySelector('.js-auto-play-btn').addEventListener('click',() => {
  autoPlay();
});

document.querySelector('.js-rock-btn').addEventListener('click',() => {
  checkWinner('rock');
});
document.querySelector('.js-paper-btn').addEventListener('click',() => {
  checkWinner('paper');
});
document.querySelector('.js-scissors-btn').addEventListener('click',() => {
  checkWinner('scissors');
});

document.querySelector('.js-reset-btn').addEventListener('click',() => {
  
  const reset = () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    elementUpdate();
  }
  // score.wins = 0;
  // score.losses = 0;
  // score.ties = 0;
  // localStorage.removeItem('score');
  // elementUpdate();
  showResetConfirmation();
  document.querySelector('.js-yes').addEventListener('click',() => {
    reset();
    hideResetConfirmation();
  });
  
  document.querySelector('.js-no').addEventListener('click',() => {
    hideResetConfirmation();
  });

});




document.body.addEventListener('keydown', (event) => {

  if(event.key === 'r'){
    checkWinner('rock');
  } else if(event.key === 'p'){
    checkWinner('paper');
  } else if(event.key === 's'){
    checkWinner('scissors');
  } else if(event.key === 'a'){
    autoPlay();
  } else if(event.key === 'Backspace'){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    elementUpdate();
  }
  //console.log(event.key);

})

function showResetConfirmation(){
  document.querySelector('.js-confirm-msg').innerHTML = `
  <p>
      Are you sure you want to reset the score?
     <button class="button js-yes" >Yes</button>
     <button class="button js-no" >No</button>
  </p>
`;
}
function hideResetConfirmation() {
  document.querySelector('.js-confirm-msg')
    .innerHTML = '';
}