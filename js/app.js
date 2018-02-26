/*
* Create a list that holds all of your cards
*/

let cardList = document.getElementsByClassName("card");
let cards = [...cardList];
console.log(cards);

let cardDeck = document.getElementsByClassName("deck")[0];

let moves = 0;
let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

let matchedCard = document.getElementsByClassName("match");

const screen = document.getElementById("congratulationsPopup");

let openedCards = [];

let second = 0, minute = 0, hour = 0;
const timer = document.querySelector(".timer");
let interval;
restartTheGame();

function restartTheGame(){

  let fragment = document.createDocumentFragment();
  cards=shuffle(cards);
  cardDeck.innerHTML="";
  cards.forEach(function (card)
  {
    card.classList.remove("show", "open", "match", "disabled");
    card.addEventListener("click", onCardClick);
    card.addEventListener("click", congratulations);
    fragment.appendChild(card);
  });
  cardDeck.appendChild(fragment);
  moves = 0;
  counter.innerHTML = moves;

  for (let i= 0; i < stars.length; i++){
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }

  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "Time 0 : 0";
  clearInterval(interval);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function onCardClick(event){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
  openedCards.push(this);
  var len = openedCards.length;
  if(len === 2){
    moveCounter();
    if(openedCards[0].getElementsByClassName("fa")[0].className === openedCards[1].getElementsByClassName("fa")[0].className){
      matched();
    } else {
      unmatched();
    }
  }
}

function moveCounter(){
  moves++;
  counter.innerHTML = moves;
  if(moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  if (moves > 12 && moves < 18){
    for( let i= 0; i < 3; i++){
      if(i > 1){
        stars[i].style.visibility = "collapse";
      }
    }
  }
  else if (moves > 17){
    for(let i= 0; i < 3; i++){
      if(i > 0){
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = "Time "+minute+" : "+second;
    second++;
    if(second == 60){
      minute++;
      second=0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
    }
  },1000);
}

function matched(){
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}


function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "no-event","unmatched");
    openedCards[1].classList.remove("show", "open", "no-event","unmatched");
    enable();
    openedCards = [];
  },1100);
}

function disable(){
  cards.forEach(function (card)
  {
    card.classList.add('disabled');
  });
}


function enable(){
  cards.forEach(function (card)
  {
    card.classList.remove('disabled');
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disabled");
    }
  });
}

function congratulations(){
  if (matchedCard.length == 16){
    clearInterval(interval);
    let finalTime = timer.innerHTML;
    screen.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
  }
}

function playAgain(){
  screen.classList.remove("show");
  restartTheGame();
}
