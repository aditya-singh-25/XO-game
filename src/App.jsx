import React, { useState, useEffect } from "react";
import "./App.css";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(Math.random() < 0.5);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  }, [squares]);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: combo };
      }
    }
    return null;
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(Math.random() < 0.5);
    setWinner(null);
    setWinningLine([]);
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {winner ? `🎉 Winner: ${winner}` : `Next Player: ${xIsNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {squares.map((value, index) => (
          <div
            key={index}
            className={`cell ${winningLine.includes(index) ? "winning" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={restartGame}>Play Again</button>
    </div>
  );
}

export default App;
