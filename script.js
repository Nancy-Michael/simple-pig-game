// Select Element needed..

const newBtn = document.getElementById('new-gmae-btn');
const rollDiceBtn = document.getElementById('roll-btn');
const holdBtn = document.getElementById('hold-btn');
const diceEl = document.getElementById('dice-img');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');

const plyer1El = document.querySelector('.player--0');
const plyer2El = document.querySelector('.player--1');

let scores, activePlayer, currentScore, playing;

//starting condition

const init = function () {
    score1.textContent = 0;
    score2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    plyer1El.classList.remove('player--winner');
    plyer1El.classList.add('player--active');
    plyer2El.classList.remove('player--winner');
    plyer2El.classList.remove('player--active');
    diceEl.classList.add('hidden');

    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;
};

init();

//switch player function
const switchPlayer = function () {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    plyer1El.classList.toggle('player--active');
    plyer2El.classList.toggle('player--active');
}

//Generate random dice roll fanctionality..

rollDiceBtn.addEventListener('click', function () {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;
        diceEl.src = `images/dice-${dice}.png`;
        diceEl.classList.remove('hidden');

        //check the roll dice..
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();

        }

    }
});

// user holds score..

holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).
            textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;

            document.querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceEl.classList.add('hidden');

        } else {
            switchPlayer();
        }
    }

});

//Reset the game..

newBtn.addEventListener('click', init)
