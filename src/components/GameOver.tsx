import { Button } from "@mui/material";
import hangman from "../classes/hangman";

interface IGameOver {
    game: hangman;
    setGame: (game: hangman | null) => void;
    setGameOver: (boolean: boolean) => void;
}

const GameOver = ({ game, setGame, setGameOver }: IGameOver) => {
    const handleReset = () => {
        setGame(null);
        setGameOver(false);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="text-5xl font-bold">GAME OVER</h1>
            <h2 className="text-3xl">
                The word was{" "}
                <span className="underline font-semibold">{game.word}</span>
            </h2>
            <Button variant="contained" onClick={handleReset}>
                RESET
            </Button>
        </div>
    );
};

export default GameOver;
