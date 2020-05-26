import React, { useState } from "react";
import GameTile from "./GameTile";
import "./GameBoard.css";

function GameBoard(props) {
  const x = "X";
  const o = "O";
  const draw = "DRAW";

  const [gameState, setGameState] = useState([
    [
      { playedBy: null, isWinner: false },
      { playedBy: null, isWinner: false },
      { playedBy: null, isWinner: false },
    ],
    [
      { playedBy: null, isWinner: false },
      { playedBy: null, isWinner: false },
      { playedBy: null, isWinner: false },
    ],
    [
      { playedBy: null, isWinner: false },
      { playedBy: null, isWinner: false },
      { playedBy: null, isWinner: false },
    ],
  ]);

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (checkRow(i) || checkCol(i)) {
        return true;
      }
    }
    return checkDiags();
  };

  const checkRow = (i) => {
    if (gameState[i][0].playedBy !== null) {
      if (
        gameState[i][0].playedBy === gameState[i][1].playedBy &&
        gameState[i][0].playedBy === gameState[i][2].playedBy
      ) {
        setWin(i, 0);
        setWin(i, 1);
        setWin(i, 2);
        return true;
      }
    }

    return false;
  };

  const checkCol = (i) => {
    if (gameState[0][i].playedBy !== null) {
      if (
        gameState[0][i].playedBy === gameState[1][i].playedBy &&
        gameState[0][i].playedBy === gameState[2][i].playedBy
      ) {
        setWin(0, i);
        setWin(1, i);
        setWin(2, i);
        return true;
      }
    }

    return false;
  };

  const checkDiags = () => {
    if (gameState[0][0].playedBy !== null) {
      if (
        gameState[0][0].playedBy === gameState[1][1].playedBy &&
        gameState[0][0].playedBy === gameState[2][2].playedBy
      ) {
        setWin(0, 0);
        setWin(1, 1);
        setWin(2, 2);
        return true;
      }
    }
    if (gameState[0][2].playedBy !== null) {
      if (
        gameState[0][2].playedBy === gameState[1][1].playedBy &&
        gameState[0][2].playedBy === gameState[2][0].playedBy
      ) {
        setWin(0, 2);
        setWin(1, 1);
        setWin(2, 0);
        return true;
      }
    }

    return false;
  };

  const setWin = (row, col) => {
    let updatedState = [...gameState];
    updatedState[row][col].isWinner = true;
    setGameState(updatedState);
  };

  const takeTurn = (row, col) => {
    if (gameState[row][col].playedBy !== null || props.winner) {
      return;
    }
    let updatedState = [...gameState];
    updatedState[row][col].playedBy = props.turn;
    setGameState(updatedState);

    if (checkWinner()) {
      props.setWinner(props.turn);
    } else if (
      gameState.every((row) => row.every((cell) => cell.playedBy !== null))
    ) {
      props.setWinner(draw);
    } else {
      props.setTurn(props.turn === x ? o : x);
    }
  };

  return (
    <div className="game">
      {gameState.map((row, i) =>
        row.map((col, j) => (
          <GameTile
            key={i * 10 + j}
            HandleClick={() => takeTurn(i, j)}
            isWinner={col.isWinner}
            playedBy={col.playedBy}
          ></GameTile>
        ))
      )}
    </div>
  );
}

export default GameBoard;
