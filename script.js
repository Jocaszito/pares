const symbols = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍓", "🍍", "🍑", "🥭", "🍉", "🍏", "🍋"];
const gameBoard = document.getElementById("game-board");
const winMessage = document.getElementById("win-message");
let firstCard = null;
let secondCard = null;
let matches = 0;
const totalPairs = 12; // Número de pares de cartas

// Inicializar o jogo
function initializeGame() {
  const selectedSymbols = symbols.slice(0, totalPairs);
  const shuffledSymbols = shuffle([...selectedSymbols, ...selectedSymbols]);

  gameBoard.innerHTML = ""; // Limpar o tabuleiro

  shuffledSymbols.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="inner">
        <div class="front">?</div>
        <div class="back">${symbol}</div>
      </div>
    `;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Embaralhar os símbolos
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Lidar com o clique nas cartas
function handleCardClick(event) {
  const card = event.currentTarget;

  if (card.classList.contains("flipped") || secondCard) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;

    const firstSymbol = firstCard.querySelector(".back").textContent;
    const secondSymbol = secondCard.querySelector(".back").textContent;

    if (firstSymbol === secondSymbol) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches++;
      resetCards();

      // Verificar se todos os pares foram encontrados
      if (matches === totalPairs) {
        showWinMessage();
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetCards();
      }, 1000);
    }
  }
}

// Resetar as cartas
function resetCards() {
  firstCard = null;
  secondCard = null;
}

// Exibir a tela de vitória
function showWinMessage() {
  winMessage.classList.remove("hidden"); // Mostrar a tela de vitória
}

// Reiniciar o jogo
function restartGame() {
  matches = 0;
  winMessage.classList.add("hidden");
  initializeGame();
}

// Iniciar o jogo
initializeGame();
