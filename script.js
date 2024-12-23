const board = document.querySelector('.game-board');

// Lista de pares (use emojis para facilitar)
const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'];

// Embaralhar as cartas
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Variáveis de controle
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Criar cartas
function createBoard() {
  const shuffledCards = shuffle(cardsArray);
  shuffledCards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerText = '?'; // Frente da carta
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

// Virar carta
function flipCard() {
  if (lockBoard) return; // Evitar clique extra
  if (this === firstCard) return; // Evitar clicar na mesma carta

  this.classList.add('flipped');
  this.innerText = this.dataset.symbol;

  if (!firstCard) {
    // Seleciona a primeira carta
    firstCard = this;
    return;
  }

  // Seleciona a segunda carta
  secondCard = this;
  checkForMatch();
}

// Verificar se as cartas combinam
function checkForMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Desabilitar cartas que combinaram
function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

// Virar cartas que não combinam
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.innerText = '?';
    secondCard.innerText = '?';
    resetBoard();
  }, 1000);
}

// Resetar variáveis
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Inicializar o jogo
createBoard();
