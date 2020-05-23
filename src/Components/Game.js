import React, { useState } from "react";
import GameBoard from "./GameBoard";
import GameStats from "./GameStats";
import "./Game.css";
import Button from "react-bootstrap/Button";

function Game(props) {
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameNumber, setGameNumber] = useState(1);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const newGame = () => {
    if (winner === "X") {
      setXWins(xWins + 1);
    } else if (winner === "O") {
      setOWins(oWins + 1);
    }

    setTurn("X");

    setWinner(null);
    setGameNumber(gameNumber + 1);
  };

  return (
    <div className="d-flex flex-wrap">
      <GameBoard
        key={gameNumber}
        turn={turn}
        setTurn={setTurn}
        winner={winner}
        setWinner={setWinner}
      ></GameBoard>
      <div className="bg-dark flex-grow-1">
        <div>Game: {gameNumber}</div>
        <div>
          {winner === turn
            ? turn + " Won!"
            : winner
            ? winner
            : turn + "'s Turn"}
        </div>
        <Button className="my-3" block onClick={newGame} disabled={!winner}>
          New Game
        </Button>
      </div>
      <GameStats xWins={xWins} oWins={oWins} total={gameNumber - 1}></GameStats>
    </div>
  );
}

export default Game;
