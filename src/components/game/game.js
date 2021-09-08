import React from 'react';
import Board, { calculateWinner } from '../board/board';
import './game.css';

export default function Game() {
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXIsNext] = React.useState(true);
  const [history, setHistory] = React.useState([
    { squares: Array(9).fill(null), winner: null, row: null, col: null },
  ]);

  const current = history[stepNumber];

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (current.winner || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';

    let winner = null;
    const winningResult = calculateWinner(squares);
    if (winningResult) winner = winningResult.winner;

    const col = i % 3;
    const row = Math.trunc(i / 3);

    setHistory(currentHistory.concat([{ squares, winner, row, col }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpToStep(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move} (${step.col}, ${step.row})` : 'Go to game start';

    return (
      <li key={move} className={`${move === stepNumber ? 'current' : ''}`}>
        <button onClick={() => jumpToStep(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (current.winner) {
    status = `Winner: ${current.winner}`;
  } else if (current.squares.indexOf(null) < 0) {
    status = `Draw!`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol className="moves">{moves}</ol>
      </div>
    </div>
  );
}
