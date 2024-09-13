const cards = document.querySelectorAll('.card');

let matchedcards = 0;
let cardone, cardtwo;
let disabledeck = false;

function flipcard(e) {
    let clickedcard = e.target; // Getting the clicked card
    if (clickedcard !== cardone && !disabledeck) {
        clickedcard.classList.add("flip");

        if (!cardone) {
            return cardone = clickedcard; // Store the first clicked card
        }

        cardtwo = clickedcard;
        disabledeck = true;

        let cardoneimg = cardone.querySelector('img').src;
        let cardtwoimg = cardtwo.querySelector('img').src;

        matchcards(cardoneimg, cardtwoimg);
    }
}

function matchcards(img1, img2) {
    if (img1 === img2) {
        matchedcards++;
        if (matchedcards === 8) {
            setTimeout(shufflecards, 1000); // Shuffle cards after a short delay
            setTimeout(showcards, 1000);
        }

        cardone.removeEventListener("click", flipcard);
        cardtwo.removeEventListener("click", flipcard);
        setTimeout(() => {
            cardone.classList.add('correct');
            cardtwo.classList.add('correct');
            cardone.classList.add('flip');
            cardtwo.classList.add('flip');
        }, 400);
        return disabledeck = false;
    }

    // If two cards do not match
    setTimeout(() => {
        cardone.classList.add('shake');
        cardtwo.classList.add('shake');
    }, 400);

    setTimeout(() => {
        cardone.classList.remove('shake', 'flip');
        cardtwo.classList.remove('shake', 'flip');
        resetCards();
    }, 1200);
}

function resetCards() {
    cardone = cardtwo = null;
    disabledeck = false;
}

function shufflecards() {
    matchedcards = 0;
    cardone = cardtwo = null;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
    arr.sort(() =>Math.random() > 0.5 ? 1 : -1)
    console.log(arr)

    // Shuffle the cards (this logic can be extended based on your requirements)
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgtag = card.querySelector('img');
        imgtag.src = `img-${arr[index]}.png`
        card.addEventListener("click", flipcard); // Re-enable click events
    });
}
shufflecards()

cards.forEach(card => {
    // card.classList.add('flip')
    card.addEventListener("click", flipcard);
});

function showcards() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('flip');
        setTimeout(() => {
            cards[i].classList.remove('flip');
        }, 2000); // Flip back after 3 seconds
    }
}

showcards()