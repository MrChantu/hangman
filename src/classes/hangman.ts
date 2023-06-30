import { getWord } from "./utils";

export interface Ikey {
    letter: string;
    isCorrect: boolean;
    isGuessed: boolean;
}

class hangman {
    word = "";
    keys: Ikey[] = [];
    lives = 9;

    async initialize() {
        this.word = await getWord();
        this.keys = this.generateKeys();
    }

    generateKeys() {
        // prettier-ignore
        const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const keys = [];

        for (const letter of ALPHABET) {
            if (this.word.includes(letter)) {
                keys.push({
                    letter: letter,
                    isCorrect: true,
                    isGuessed: false,
                });
            } else {
                keys.push({
                    letter: letter,
                    isCorrect: false,
                    isGuessed: false,
                });
            }
        }

        return keys;
    }

    getBlankWord() {
        let blankword = "";

        for (const letter of this.word) {
            const key = this.keys.find((k) => k.letter === letter);
            if (key && key.isCorrect && key.isGuessed) {
                blankword += letter;
            } else {
                blankword += "_";
            }
        }

        return blankword;
    }
}

export default hangman;
