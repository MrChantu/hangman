export default class storage {
    static currentWord = null;

    static lives = null;

    static wrongCounter = 0;

    static isWon = false;

    static blankWord = [];

    static guessedLetters = [];

    static getWord() {
        return this.currentWord;
    }

    static getGuessedLetters() {
        return this.guessedLetters;
    }

    static getBlankWord() {
        return this.blankWord;
    }

    static getIsWon() {
        return this.isWon;
    }

    static getLives() {
        return this.lives;
    }

    static getWrongCounter() {
        return this.wrongCounter;
    }

    static addLetter(letter) {
        this.guessedLetters.push(letter);
    }

    static resetGuessedLetters() {
        while (this.guessedLetters.length > 0) {
            this.guessedLetters.pop();
        }
    }

    static resetWrongCounter() {
        this.wrongCounter = 0;
    }

    static resetBlankWord() {
        this.blankWord = [];
    }

    static setWord(word) {
        this.currentWord = word.toUpperCase();
    }

    static setLives(number) {
        this.lives = number;
    }

    static setBlankWord(word) {
        this.blankWord = word;
    }

    static addToWrongCounter() {
        this.wrongCounter += 1;
    }

    static isWonTrue() {
        this.isWon = true;
    }

    static isWonFalse() {
        this.isWon = false;
    }
}
