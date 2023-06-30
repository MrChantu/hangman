import { useState, useEffect } from "react";
import { CircularProgress, Button } from "@mui/material";
import hangman from "./classes/hangman";
import { Ikey } from "./classes/hangman";
import GameOver from "./components/GameOver";

function App() {
    const [game, setGame] = useState<hangman | null>(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (game === null) {
            (async () => {
                const newGame = new hangman();
                await newGame.initialize();
                setGame(newGame);
            })();
        }

        if (game !== null) {
            if (game.lives === 0 || !game.getBlankWord().includes("_")) {
                setGameOver(true);
            }
        }

        // console.log(game);
    }, [game]);

    const handleKeyClick = (key: Ikey) => {
        if (game !== null) {
            setGame((prevGame) => {
                const gameCopy = Object.setPrototypeOf(
                    structuredClone(prevGame),
                    hangman.prototype
                );
                const foundKey = gameCopy.keys.find(
                    (k: Ikey) => k.letter === key.letter
                );

                foundKey.isGuessed = true;
                // If the letter is not in the word, remove a life
                if (foundKey.isCorrect === false) gameCopy.lives -= 1;

                return gameCopy;
            });
        }
    };

    return (
        <>
            {game === null ? (
                <div className="flex flex-col justify-center items-center">
                    <CircularProgress />
                    <h1>Loading...</h1>
                </div>
            ) : gameOver ? (
                <GameOver
                    game={game}
                    setGame={setGame}
                    setGameOver={setGameOver}
                />
            ) : (
                <div className="self-center flex flex-col items-center gap-5 p-5 max-w-lg">
                    <h1 className="text-5xl">{game.getBlankWord()}</h1>
                    <h1 className="text-5xl">{game.lives}</h1>
                    <div className="flex flex-wrap justify-center gap-1">
                        {game.keys.map((key) => {
                            return key.isGuessed ? (
                                <Button variant="contained" disabled>
                                    {key.letter}
                                </Button>
                            ) : (
                                <Button
                                    className="w-12 h-12"
                                    variant="outlined"
                                    onClick={() => handleKeyClick(key)}
                                >
                                    {key.letter}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
