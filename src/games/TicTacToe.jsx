import { useState } from 'react';

export default function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    // Hücre doluysa veya oyun bittiyse tıklamayı engelle
    if (board[index] || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? '❌' : '⭕';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>❌⭕ Tic-Tac-Toe (XOX)</h2>
      
      <div className="status">
        {winner 
          ? `🎉 Kazanan: ${winner}` 
          : board.every(Boolean) 
          ? '🤝 Berabere!' 
          : `Sıradaki Oyuncu: ${isXNext ? '❌' : '⭕'}`}
      </div>

      <div className="board">
        {board.map((value, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {value}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>Yeniden Başlat</button>
    </div>
  );
}

// Kazananı hesaplayan yardımcı fonksiyon
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Satırlar
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Sütunlar
    [0, 4, 8], [2, 4, 6],           // Çaprazlar
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}