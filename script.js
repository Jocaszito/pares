// script.js

const cardsContainer = document.getElementById('cards-container');
const congratulations = document.getElementById('congratulations');
const restartButton = document.getElementById('restart-button');

let cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    cardsContainer.innerHTML = '';
    const shuffledCards = shuffle(cardValues);
    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerText = '?';
        card.addEventListener('click', flipCard);
        cardsContainer.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        if (matchedCards === cardValues.length) {
            showCongratulations();
        }
    } else {
        firstCard.classList.remove('flipped');
        firstCard.innerText = '?';
        secondCard.classList.remove('flipped');
        secondCard.innerText = '?';
    }
    flippedCards = [];
}

function showCongratulations() {
    congratulations.style.display = 'block';
}

function restartGame() {
    matchedCards = 0;
    flippedCards = [];
    congratulations.style.display = 'none';
    createCards();
}

// Inicia o jogo ao carregar a página
createCards();
