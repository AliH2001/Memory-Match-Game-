// Constants
const cards = ['🥭', '🥭', '🍒', '🍒', '🥑', '🥑', '🌽', '🌽', '🥕', '🥕', '🍇', '🍇'];  
// Variables
let timer;
let selectedCards = [];
let matchedCards = [];
let isTimerRunning = false;

// Cached Element References
const timerDisplay = document.getElementById('timer');
const gameBoard = document.getElementById('gameBoard');
const messageDisplay = document.getElementById('message');

// Shuffles the cards
const shuffleCards = () => {
    return cards.sort(() => 0.5 - Math.random());
  };
  
// Creates the game board
  const createBoard = () => {
    const shuffledCards = shuffleCards();
    shuffledCards.forEach((symbol) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      gameBoard.appendChild(card);
    });
  };
  
  // Starts the game
  const startGame = () => {
    selectedCards = [];
    matchedCards = [];
    isTimerRunning = false;
    gameBoard.innerHTML = '';
    messageDisplay.textContent = '';
    timerDisplay.textContent = 'Timer: 60s';
    createBoard();
  };
  
  // Starts the timer
  const startTimer = () => {
    let timeRemaining = 60;
    timer = setInterval(() => {
      timeRemaining--;
      timerDisplay.textContent = `Timer: ${timeRemaining}s`;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        messageDisplay.textContent = 'Time up! You lose!';
      }
    }, 1000);
  };
  
  // Checks for a match
  const checkMatch = (clickedCard) => {
    selectedCards.push(clickedCard);
    if (selectedCards.length === 2) {
      if (selectedCards[0].dataset.symbol === selectedCards[1].dataset.symbol) {
        matchedCards.push(...selectedCards);
        selectedCards = [];
        if (matchedCards.length === cards.length) {
          clearInterval(timer);
          messageDisplay.textContent = 'Congratulations! You win!';
        }
      } else {
        setTimeout(() => {
          selectedCards.forEach(card => card.textContent = '');
          selectedCards = [];
        }, 500);
      }
    }
  };
  // Handles card click events
  const handleCardClick = (event) => {
    const clickedCard = event.target;
    if (clickedCard.classList.contains('card') && clickedCard.textContent === '') {
      if (!isTimerRunning) {
        isTimerRunning = true;
        startTimer();
      }
      clickedCard.textContent = clickedCard.dataset.symbol;
      checkMatch(clickedCard);
    }
  };

  // Event Listeners
gameBoard.addEventListener('click', handleCardClick);

// Initialize the game on DOM load
document.addEventListener('DOMContentLoaded', startGame);

      