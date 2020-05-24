import React from "react";
import "./GameTile.css";

function GameTile(props) {
  return (
    <div
      className={
        "gametile " +
        (props.GameState.isWinner
          ? "won"
          : props.GameState.playedBy
          ? "played"
          : "unplayed")
      }
      onClick={props.HandleClick}
    >
      {props.GameState.playedBy}
    </div>
  );
}

export default GameTile;
