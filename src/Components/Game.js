import React from "react";
import GameTile from "./GameTile";
import "./Game.css";

function Game(props) {
  return (
    <div className="game bg-success">
      <GameTile></GameTile>
    </div>
  );
}

export default Game;
