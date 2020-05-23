import React, { useState } from "react";
import GameTile from "./GameTile";
import "./GameBoard.css";

function GameBoard(props) {
  const x = "X";
  const o = "O";
  const draw = "DRAW";

  const defaultColor = "#151623";
  const hoverColor = "#234216";
  const winColor = "#00FF00";

  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const [gameState, setGameState] = useState(
    indexes.map(() => {
      return { playedBy: null, isWinner: false, color: defaultColor };
    })
  );

  const checkWinner = () => {
    if (
      checkRow(0) ||
      checkRow(3) ||
      checkRow(6) ||
      checkCol(0) ||
      checkCol(1) ||
      checkCol(2) ||
      checkDiag(0) ||
      checkDiag(2)
    ) {
      return true;
    }
    return false;
  };

  const checkRow = i => {
    if (gameState[i].playedBy !== null) {
      if (
        gameState[i].playedBy === gameState[i + 1].playedBy &&
        gameState[i].playedBy === gameState[i + 2].playedBy
      ) {
        setWin(i);
        setWin(i + 1);
        setWin(i + 2);
        return true;
      }
    }

    return false;
  };

  const checkCol = i => {
    if (gameState[i].playedBy !== null) {
      if (
        gameState[i].playedBy === gameState[i + 3].playedBy &&
        gameState[i].playedBy === gameState[i + 6].playedBy
      ) {
        setWin(i);
        setWin(i + 3);
        setWin(i + 6);
        return true;
      }
    }

    return false;
  };

  const checkDiag = i => {
    if (gameState[i].playedBy !== null) {
      if (
        gameState[i].playedBy === gameState[4].playedBy &&
        gameState[i].playedBy === gameState[i === 0 ? 8 : 6].playedBy
      ) {
        setWin(i);
        setWin(4);
        setWin(i === 0 ? 8 : 6);
        return true;
      }
    }

    return false;
  };

  const setWin = i => {
    let updatedState = [...gameState];
    updatedState[i].isWinner = true;
    updatedState[i].color = winColor;
    setGameState(updatedState);
  };

  const takeTurn = tile => {
    if (gameState[tile].playedBy !== null || props.winner) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[tile].playedBy = props.turn;
    setGameState(updatedState);

    if (checkWinner()) {
      props.setWinner(props.turn);
    } else if (gameState.find(i => i.playedBy === null) === undefined) {
      props.setWinner(draw);
    } else {
      props.setTurn(props.turn === x ? o : x);
    }
  };

  const mouseEnter = tile => {
    if (props.winner || gameState[tile].playedBy) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[tile].color = gameState[tile].isWinner ? winColor : hoverColor;
    setGameState(updatedState);
    console.log("mouse entered");
  };

  const mouseLeave = tile => {
    if (props.winner) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[tile].color = gameState[tile].isWinner
      ? winColor
      : defaultColor;
    setGameState(updatedState);
  };

  return (
    <div className="game">
      {indexes.map(i => (
        <GameTile
          key={i}
          HandleClick={() => takeTurn(i)}
          HandleMouseEnter={() => mouseEnter(i)}
          HandleMouseLeave={() => mouseLeave(i)}
          GameState={gameState[i]}
        ></GameTile>
      ))}
    </div>
  );
}

export default GameBoard;
