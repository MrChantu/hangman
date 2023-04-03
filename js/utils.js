import storage from './storage.js';

export default class utils {
    static async startup() {
        const randomWord = await utils.getRandomWord();
        storage.setWord(randomWord);
        this.setWord(randomWord);
        this.loadEventListeners();
        console.log(storage.getWord());
    }

    static async getRandomWord() {
        const response = await fetch(
            'https://random-word-api.herokuapp.com/word'
        );
        const data = await response.json();
        return data[0];
    }

    static checkValidity(letter) {
        const letterLength = letter.length;
        if (letterLength > 1) {
            return false;
        }
        if (letterLength <= 0) {
            return false;
        }
        return true;
    }

    static checkAlpha(letter) {
        const exp = /^[A-Za-z]+$/;
        const result = exp.test(letter);
        if (result) {
            return true;
        }

        return false;
    }

    static checkLetter(letter) {
        const WORDINFO = document.getElementById('word-info');
        const WININFO = document.getElementById('win-info');
        const word = storage.getWord();
        const wordLength = word.length;
        const blankWord = storage.getBlankWord();
        for (let i = 0; i < wordLength; i += 1) {
            if (letter === word[i]) {
                blankWord[i] = letter;
            }
        }
        if (!word.includes(letter)) {
            storage.addToWrongCounter();
            WININFO.textContent = `"${letter}" is not correct.`;
        }
        WORDINFO.textContent = blankWord.join('');
    }

    static setWord() {
        const WORDINFO = document.getElementById('word-info');
        const wordLength = storage.getWord().length;
        const blankWord = storage.getBlankWord();

        for (let i = 0; i < wordLength; i += 1) {
            blankWord[i] = '_';
        }
        storage.setBlankWord(blankWord);
        storage.setLives(9 + wordLength);
        WORDINFO.textContent = blankWord.join('');
    }

    static checkWord(word) {
        const PLAYBTN = document.getElementById('playagain');
        const GUESSBTN = document.getElementById('guessbtn');
        const INPUTBOX = document.getElementById('word-input');
        const WININFO = document.getElementById('win-info');
        const wrongCounter = storage.getWrongCounter();
        const wordLength = storage.getWord().length;
        for (let i = 0; i < wordLength; i += 1) {
            if (!word.includes('_')) {
                WININFO.textContent = 'You win!';
                storage.isWonTrue();
                // Set input/info boxes hidden or unhidden
                PLAYBTN.hidden = false;
                GUESSBTN.hidden = true;
                INPUTBOX.hidden = true;
                break;
            } else if (wrongCounter > 9) {
                WININFO.textContent = `You ran out of guesses. The word was "${storage.getWord()}".`;
                storage.isWonTrue();
                PLAYBTN.hidden = false;
                GUESSBTN.hidden = true;
                INPUTBOX.hidden = true;
                break;
            } else {
                storage.isWonFalse();
            }
        }
    }

    static handleImage() {
        const IMAGE = document.getElementById('hangman-img');
        const wrongCounter = storage.getWrongCounter();
        if (wrongCounter === 0 || wrongCounter > 9 || storage.getIsWon()) {
            IMAGE.style.visibility = 'hidden';
        } else {
            IMAGE.style.visibility = 'visible';
        }
        IMAGE.src = `./img/hangman${wrongCounter}.svg`;
        if (wrongCounter > 9) {
            IMAGE.src = `./img/hangman0.svg`;
        } else if (storage.getIsWon()) {
            IMAGE.src = `./img/hangman0.svg`;
        }
    }

    static mergeSort(array) {
        const merge = (left, right) => {
            const result = [];

            while (left.length && right.length) {
                if (left[0] < right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }

            return [...result, ...left, ...right];
        };
        if (array.length === 0) return undefined;
        if (array.length <= 1) return array;
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
        return merge(this.mergeSort(left), this.mergeSort(right));
    }

    static handleUsedLetters() {
        const LETTERS = document.querySelector('#letters-content');
        const letterArray = storage.getGuessedLetters();
        const sortedArray = this.mergeSort(letterArray);
        LETTERS.textContent = sortedArray;
    }

    static loadEventListeners() {
        const PLAYBTN = document.getElementById('playagain');
        const input = document.querySelector('#word-input');
        const guessBtn = document.querySelector('#guessbtn');
        const WININFO = document.getElementById('win-info');
        const guessedLetters = storage.getGuessedLetters();
        function handleInput() {
            const blankWord = storage.getBlankWord();
            const inputBox = document.querySelector('#word-input');
            const guessedLetter = inputBox.value.toUpperCase();
            if (!utils.checkValidity(guessedLetter)) {
                WININFO.textContent = 'Make sure you are entering 1 letter.';
            } else if (!utils.checkAlpha(guessedLetter)) {
                WININFO.textContent =
                    'Make sure you are entering only letters.';
            } else if (guessedLetters.includes(guessedLetter)) {
                WININFO.textContent = `You already guessed the letter "${guessedLetter}".`;
            } else {
                storage.addLetter(guessedLetter);
                WININFO.textContent = '';
                // checkValidity(guessedLetter);
                utils.checkLetter(guessedLetter);
                utils.checkWord(blankWord);
                utils.handleImage();
                utils.handleUsedLetters();
            }
            inputBox.value = '';
        }
        async function handleReset() {
            const PLAYBTN = document.getElementById('playagain');
            const GUESSBTN = document.getElementById('guessbtn');
            const INPUTBOX = document.getElementById('word-input');
            const WORDINFO = document.getElementById('word-info');
            const LETTERS = document.querySelector('#letters-content');
            if (storage.getIsWon()) {
                WININFO.textContent = '';
                PLAYBTN.hidden = true;
                GUESSBTN.hidden = false;
                INPUTBOX.hidden = false;
                WORDINFO.textContent = '';
                LETTERS.textContent = '';
                utils.handleImage();
                storage.setWord(await utils.getRandomWord());
                console.log(storage.getWord());
                storage.resetGuessedLetters();
                storage.resetWrongCounter();
                storage.resetBlankWord();
                utils.setWord();
                storage.isWonFalse();
            }
        }
        guessBtn.addEventListener('click', handleInput);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleInput();
            }
        });
        PLAYBTN.addEventListener('click', handleReset);
    }
}
