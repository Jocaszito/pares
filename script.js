const emojis = ["💖", "💍", "🍫", "🌹", "💑", "💌", "🎶", "🍷"];
let gameArray = [...emojis, ...emojis]; // Duplicando para formar pares
let firstCard, secondCard;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(gameArray);
    const board = document.getElementById("gameBoard");
    gameArray.forEach((emoji) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.emoji = emoji;
        card.innerText = emoji;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.remove("hidden");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    lockBoard = true;
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

createBoard();
