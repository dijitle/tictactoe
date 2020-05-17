import React from "react";
import "./GameTile.css";

function GameTile(props) {
  return (
    <div
      className="gametile"
      style={{ backgroundColor: props.GameState.color }}
      onMouseEnter={props.HandleMouseEnter}
      onMouseLeave={props.HandleMouseLeave}
      onClick={props.HandleClick}
    >
      {props.GameState.playedBy}
    </div>
  );
}

export default GameTile;
