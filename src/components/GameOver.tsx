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
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl">GAME OVER</h1>
            <h1 className="text-5xl">{`The word was ${game.word}`}</h1>
            <Button variant="contained" onClick={handleReset}>
                RESET
            </Button>
        </div>
    );
};

export default GameOver;
