import React from 'react';
import Square from '../square/square';
import './board.css';

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: line };
    }
  }

  return null;
}

function Board(props) {
  let winningSquares = [];
  const winningResult = calculateWinner(props.squares);
  if (winningResult) winningSquares = winningResult.winningSquares;

  const boardRows = [];

  for (let i = 0; i < 3; i++) {
    const boardRowSquares = [];

    for (let j = 0; j < 3; j++) {
      const squareIndex = j + 3 * i;

      boardRowSquares.push(
        <Square
          key={squareIndex}
          value={props.squares[squareIndex]}
          isSelectable={!winningResult && !props.squares[squareIndex]}
          isWinningSquare={winningSquares.indexOf(squareIndex) > -1}
          onClick={() => props.onClick(squareIndex)}
        />
      );
    }

    boardRows.push(
      <div key={i} className="board-row">
        {boardRowSquares}
      </div>
    );
  }

  return <>{boardRows}</>;
}

function areEqual(prevProps, nextProps) {
  return prevProps.squares === nextProps.squares && prevProps.onClick === nextProps.onClick;
}

export default React.memo(Board, areEqual);
