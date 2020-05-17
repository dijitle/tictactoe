import React, { useState } from "react";
import GameTile from "./GameTile";
import "./Game.css";

function Game(props) {
  const x = "X";
  const o = "O";

  const defaultColor = "#151623";
  const hoverColor = "#234216";
  const winColor = "#00FF00";

  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const [turn, setTurn] = useState(x);
  const [gameState, setGameState] = useState(
    indexes.map(() => {
      return { playedBy: null, isWinner: false, color: defaultColor };
    })
  );

  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    for (let i = 0; i < 7; i += 3) {
      if (gameState[i].playedBy === null) {
        continue;
      }
      let rowMatches = true;
      for (let j = i + 1; j < i + 3; j++) {
        if (gameState[i].playedBy !== gameState[j].playedBy) {
          rowMatches = false;
          break;
        }
      }
      if (rowMatches) {
        let updatedState = [...gameState];
        for (let j = i; j < i + 3; j++) {
          updatedState[j].color = winColor;
          updatedState[j].isWinner = true;
        }
        setGameState(updatedState);

        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (gameState[i].playedBy === null) {
        continue;
      }
      let colMatches = true;
      for (let j = i + 3; j < i + 7; j += 3) {
        if (gameState[i].playedBy !== gameState[j].playedBy) {
          colMatches = false;
          break;
        }
      }
      if (colMatches) {
        let updatedState = [...gameState];
        for (let j = i; j < i + 7; j += 3) {
          updatedState[j].color = winColor;
          updatedState[j].isWinner = true;
        }
        setGameState(updatedState);

        return true;
      }
    }

    return false;
  };

  const takeTurn = (tile) => {
    if (gameState[tile].playedBy !== null || winner) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[tile].playedBy = turn;
    setGameState(updatedState);

    if (checkWinner()) {
      setWinner(turn);
    }

    setTurn(turn === x ? o : x);
  };

  const mouseEnter = (tile) => {
    if (winner || gameState[tile].playedBy) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[tile].color = gameState[tile].isWinner ? winColor : hoverColor;
    setGameState(updatedState);
    console.log("mouse entered");
  };

  const mouseLeave = (tile) => {
    if (winner) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[tile].color = gameState[tile].isWinner
      ? winColor
      : defaultColor;
    setGameState(updatedState);
  };

  return (
    <>
      <div className="game bg-success">
        {indexes.map((i) => (
          <GameTile
            key={i}
            HandleClick={() => takeTurn(i)}
            HandleMouseEnter={() => mouseEnter(i)}
            HandleMouseLeave={() => mouseLeave(i)}
            GameState={gameState[i]}
          ></GameTile>
        ))}
      </div>
      <div>
        {winner
          ? winner + " Won!"
          : gameState.filter((i) => i.playedBy === null).length > 0
          ? turn + "'s turn"
          : "Draw!"}
      </div>
    </>
  );
}

export default Game;
