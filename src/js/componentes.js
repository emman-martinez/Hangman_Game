import './../css/componentes.css';

const wordEl        = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn  = document.getElementById('play-again');
const popup         = document.getElementById('popup-container');
const notification  = document.getElementById('notification-container');
const finalMessage  = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = [
    'application', 
    'programming', 
    'interface', 
    'wizard', 
    'apple', 
    'google', 
    'amazon', 
    'facebook', 
    'microsoft'
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];
/* ************************************************************ */
const displayWord = () => { // Show hidden word
    wordEl.innerHTML = `
        ${
            selectedWord
                .split('')
                .map(letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `).join('')
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // console.log(wordEl.innerText, innerWord);
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! :)';
        popup.style.display = 'flex';
    }
    
}
/* ************************************************************ */
const updateWrongLettersEl = () => { // Update the wrong letters
    wrongLettersEl.innerHTML = `
        ${
            wrongLetters.length > 0 ? '<p>Wrong</p>' : ''
        }
        ${
            wrongLetters.map(letter => {
                return `<span>${letter}</span>`;
            })
        }
    `;

    figureParts.forEach((part, index) => { // Display parts
        // console.log(part, index);
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length) { // Check if lost
        finalMessage.innerText = 'Unfortunately you lost. :(';
        popup.style.display = 'flex';
    }
};
/* ************************************************************ */
const showNotification = () => { // Show Notification
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};
/* ************************************************************ */
window.addEventListener('keydown', (e) => { // Keydown letter press
    // console.log(e.keyCode);
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                // console.log(correctLetters);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                // console.log(wrongLetters);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});
/* ************************************************************ */
playAgainBtn.addEventListener('click', () => { // Restart game and play again
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';

    // console.log(selectedWord);

});
/* ************************************************************ */
const eventos = () => {
    displayWord();
};
/* ************************************************************ */
const init = () => {
    console.log('Hangman Game');
    // console.log(selectedWord);
    eventos();
};
/* ************************************************************ */
export {
    init
} 