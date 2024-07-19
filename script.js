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
  .innerHTML = `You <img src="${yourMove}-emoji.png"  class="move-icon">  
  <img src="${computerMove}-emoji.png" class="move-icon">Computer `;
  elementUpdate();
}
function elementUpdate(){
  document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, Ties : ${score.ties}` ;
}
