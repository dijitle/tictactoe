import React from "react";
import "./GameTile.css";

function GameTile(props) {
  return (
    <div
      className={
        "gametile " +
        (props.isWinner
          ? "won"
          : props.playedBy || props.hasWinner
          ? "played"
          : "unplayed")
      }
      onClick={props.HandleClick}
    >
      {props.playedBy}
    </div>
  );
}

export default GameTile;
