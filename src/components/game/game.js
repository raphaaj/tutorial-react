import React from 'react';
import Board from '../board/board';
import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{ squares: Array(9).fill(null), winner: null }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (current.winner || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = Board.calculateWinner(squares);

    this.setState({
      history: history.concat([{ squares, winner }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (current.winner) {
      status = `Winner: ${current.winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol className="moves">{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
