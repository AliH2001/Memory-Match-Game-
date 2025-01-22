/*------------------------------------------------------------------------ Constants -------------------------------------------------------------*/

/*------------------------------------------------------------------------ Variables --------------------------------------------------------------*/
let first = null;
let second = null;
let timer = null;
let timeRemaining = 30;
let isChecking = false; 
let timerStarted = false;

/*--------------------------------------------------------- Cached Element References -------------------------------------------------------*/
const cards = document.querySelectorAll('.card');
const cardContainer = document.getElementById('cardContainer');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');

/*------------------------------------------------------------------ Functions --------------------------------------------------------------------*/


const shufflecards = () => {
  cards.forEach((card) => {
    const randomNum = Math.floor(Math.random() * cards.length);
    card.style.order = randomNum;
  });
};

const goodLookMessage  = () => {
  messageDisplay.textContent = 'Good Luck! 🍀';
  messageDisplay.style.color = 'green';
};


const startTimer = () => {
  timer = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = `Time Left: ${timeRemaining}s`;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      messageDisplay.textContent = 'Time is up 😢 You lose ☹️';
      messageDisplay.style.color = 'red';
      cards.forEach(card => card.style.pointerEvents = 'none');
    }
  }, 1000);
};


const restartGame = () => {
  clearInterval(timer); 
  timeRemaining = 30; 
  timerDisplay.textContent = `Time Left: 30s`; 
  messageDisplay.textContent = ''; 
  cards.forEach(card => card.style.pointerEvents = 'auto'); 
  first = null; 
  second = null;

  cards.forEach((card) => {
    card.classList.remove('show', 'matched');
    card.textContent = '';
    card.style.pointerEvents = 'auto'; 
  });
  shufflecards(); 
  timerStarted = false;
  goodLookMessage ();
  
};

const checkMatch = () => {
  if (first.getAttribute('data-value') === second.getAttribute('data-value')) {
    setTimeout(() => {
      first.classList.add('matched');
      second.classList.add('matched');
      first.style.pointerEvents = 'none'; 
      second.style.pointerEvents = 'none';
      first = null;
      second = null;
      isChecking = false; 

  
      if (Array.from(cards).every(card => card.classList.contains('matched'))) {
        clearInterval(timer);
        messageDisplay.textContent = 'Congratulations, You win 😊';
      }
    }, 500);
  } else {
    
    setTimeout(() => {
      first.classList.remove('show');
      second.classList.remove('show');
      first.textContent = '';
      second.textContent = '';
      first = null;
      second = null;
      isChecking = false; 
    }, 1000);
  }
};

/*------------------------------------------------------------------------ Event Listeners -----------------------------------------------------------*/

const handlecardClick = (event) => {
  const card = event.target;

  if (isChecking || card.classList.contains('show') || card.classList.contains('matched') || card === first) {
    return;
  }
  card.classList.add('show');
  card.textContent = card.getAttribute('data-value');

  if (!first) {
    first = card;
  } else {
    second = card;
    isChecking = true;
    checkMatch();
  }
};


cards.forEach((card) => {
  card.addEventListener('click', (event) => {
    if (!timerStarted) {
      startTimer(); 
      timerStarted = true; 
      goodLookMessage (); 
    }
    handlecardClick(event);
  });
});


restartButton.addEventListener('click', restartGame);

/*-------------------------------------------------------------------- Initialization -------------------------------------------------------------*/
function init() {
  goodLookMessage (); 
  shufflecards();
};
