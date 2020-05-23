import React from "react";
import Table from "react-bootstrap/Table";

function GameStats(props) {
  return (
    <div className="bg-dark flex-grow-1">
      <Table variant="dark" size="sm">
        <thead>
          <tr>
            <th>X</th>
            <th>Draw</th>
            <th>O</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.xWins}</td>
            <td>{props.total - (props.xWins + props.oWins)}</td>
            <td>{props.oWins}</td>
          </tr>
          <tr>
            <td>
              {((props.xWins / Math.max(props.total, 1)) * 100).toFixed(2)}%
            </td>
            <td>
              {(
                ((props.total - (props.xWins + props.oWins)) /
                  Math.max(props.total, 1)) *
                100
              ).toFixed(2)}
              %
            </td>
            <td>
              {((props.oWins / Math.max(props.total, 1)) * 100).toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default GameStats;
