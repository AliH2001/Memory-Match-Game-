const cards = ['A', '', '🍒', '🍒', '🥑', '🥑', '🌽', '🌽', '🥕', '🥕', '🍇', '🍇', '🍉', '🍉', '🍌', '🍌', '🥭', '🥭', '🍍', '🍍'];
let moveCounter = 0;
let timer;
let timeLeft = 60;
let firstCard, secondCard;
let matchedPairs = 0;

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('rulesBtn').addEventListener('click', showRules);
document.getElementById('tryAgainBtn').addEventListener('click', startGame);

function startGame() {
    resetGame();
    shuffle(cards);
    createBoard();
    startTimer();
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (this === firstCard || this.classList.contains('matched')) return;

    this.innerText = this.dataset.value;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moveCounter++;
        document.getElementById('moveCounter').innerText = moveCounter;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            gameOver('You win!');
        }
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.innerText = '';
            secondCard.innerText = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            gameOver('Time out! Game over.');
        }
    }, 1000);
}

function gameOver(message) {
    clearInterval(timer);
    alert(message);
    document.getElementById('tryAgainBtn').style.display = 'block';
}

function resetGame() {
    moveCounter = 0;
    timeLeft = 60;
    document.getElementById('moveCounter').innerText = moveCounter;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('tryAgainBtn').style.display = 'none';
    firstCard = null;
    secondCard = null;
    matchedPairs = 0;
}

function showRules() {
    alert('Match all the pairs of cards before the time runs out. Use as few moves as possible.');
}
