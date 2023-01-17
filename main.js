let cards = [];
let firstCard = null;
let count = 0;
let score = 0;
let matchCards = 0;
let matches = 8
let points = 10


// shuffle the deck and get the first 16 cards
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(data => {
        let deckId = data.deck_id;
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=16`)
            .then(response => response.json())
            .then(data => {
                cards = data.cards;
                // create the card elements and add them to the page
                let gameContainer = document.getElementById('game-container');
                let row1 = document.getElementById('row1');
                let row2 = document.getElementById('row2');
                let row3 = document.getElementById('row3');
                let row4 = document.getElementById('row4');
                for (let i = 0; i < cards.length; i++) {
                    let card = cards[i];
                    let cardElement = document.createElement('div');
                    cardElement.classList.add('card');
                    cardElement.innerHTML = `
                        <div class="card-back"></div>
                        <div class="card-front" style="background-image: url(${card.image})"></div>
                    `;
                    cardElement.addEventListener('click', flipCard);
                    // game container rows
                    if (i % 4 === 0) {
                        row1.appendChild(cardElement);
                    } else if (i % 4 === 1) {
                        row2.appendChild(cardElement);
                    } else if (i % 4 === 2) {
                        row3.appendChild(cardElement);
                    } else {
                        row4.appendChild(cardElement);
                    }
                }
                // start the timer
                // startTimer();

                // start the timer for 3 minutes
                let timer = document.getElementById("timer");
                let countDownDate = new Date().getTime() + 180000;
                let x = setInterval(function() {
                    let now = new Date().getTime();
                    let distance = countDownDate - now;
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        timer.innerHTML = `${minutes}m ${seconds}s `;
                            if (distance < 0) {
                                 clearInterval(x);
                                timer.innerHTML = "EXPIRED";
                            }
                        })
                // start the cards face down
                let cardElements = document.querySelectorAll('.card');
                for (let i = 0; i < cardElements.length; i++) {
                    cardElements[i].classList.add("flip");
                }
            });
    });
    
// function to flip the card and check for a match
function flipCard(event) {
    let card = event.currentTarget;
    card.classList.toggle('flip');
    // remove the cards if they match
    if (firstCard === card) {
        matchCards++;
        matches--;
    }
    if (matches = 0){
        alert("Congratulations! You have found all the matches. Your score is: " + score);
    }

    if (!firstCard) {
        firstCard = card;
    } else {
        let firstCardFront = firstCard.querySelector('.card-front');
        let secondCardFront = card.querySelector('.card-front');
        if (firstCardFront.style.backgroundImage === secondCardFront.style.backgroundImage) {
            firstCard = null;
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                card.classList.remove('flip');
                firstCard = null;
            }, 1000);
        }
    } // end of if else
}// end of function

