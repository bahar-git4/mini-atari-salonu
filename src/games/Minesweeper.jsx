import { useState, useEffect } from 'react';

// Oyun ayarları (6x6'lık mini bir ızgara ve 6 mayın)
const ROWS = 6;
const COLS = 6;
const MINES = 6;

export default function Minesweeper({ onBack }) {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [flags, setFlags] = useState(0);

  // Oyun başladığında veya sıfırlandığında tahtayı kur
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    // 1. Boş hücreleri oluştur
    let newBoard = Array(ROWS).fill().map((_, x) =>
      Array(COLS).fill().map((_, y) => ({
        x, y, 
        isMine: false, 
        isRevealed: false, 
        isFlagged: false, 
        neighbor: 0 
      }))
    );

    // 2. Rastgele mayınları yerleştir
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      let rx = Math.floor(Math.random() * ROWS);
      let ry = Math.floor(Math.random() * COLS);
      if (!newBoard[rx][ry].isMine) {
        newBoard[rx][ry].isMine = true;
        minesPlaced++;
      }
    }

    // 3. Her hücrenin etrafındaki mayın sayısını hesapla
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newBoard[r][c].isMine) {
          let count = 0;
          directions.forEach(([dx, dy]) => {
            let nr = r + dx, nc = c + dy;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].isMine) {
              count++;
            }
          });
          newBoard[r][c].neighbor = count;
        }
      }
    }

    setBoard(newBoard);
    setIsGameOver(false);
    setIsWinner(false);
    setFlags(0);
  };

  // Sol Tık: Hücreyi aç
  const revealCell = (r, c) => {
    if (isGameOver || isWinner || board[r][c].isRevealed || board[r][c].isFlagged) return;

    // React state'i doğrudan değiştirilmez, derin bir kopyasını alıyoruz
    let newBoard = JSON.parse(JSON.stringify(board));

    // Mayına tıklandıysa: Oyunu bitir
    if (newBoard[r][c].isMine) {
      newBoard.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true; // Tüm mayınları göster
      }));
      setBoard(newBoard);
      setIsGameOver(true);
      return;
    }

    // Boş alanları tek seferde açan Recursive (Yinelenen) fonksiyon
    const revealEmpty = (x, y) => {
      if (x < 0 || x >= ROWS || y < 0 || y >= COLS || newBoard[x][y].isRevealed || newBoard[x][y].isFlagged) return;
      
      newBoard[x][y].isRevealed = true;
      
      // Eğer etrafında hiç mayın yoksa, komşularını da aç
      if (newBoard[x][y].neighbor === 0) {
        const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        directions.forEach(([dx, dy]) => revealEmpty(x + dx, y + dy));
      }
    };

    revealEmpty(r, c);
    setBoard(newBoard);
    checkWin(newBoard);
  };

  // Sağ Tık: Bayrak koy/kaldır
  const toggleFlag = (e, r, c) => {
    e.preventDefault(); // Tarayıcının sağ tık menüsünü engelle
    if (isGameOver || isWinner || board[r][c].isRevealed) return;

    let newBoard = [...board];
    newBoard[r] = [...board[r]]; // Satırı kopyala
    newBoard[r][c] = { ...board[r][c], isFlagged: !board[r][c].isFlagged }; // Hücreyi güncelle
    
    setBoard(newBoard);
    setFlags(prev => newBoard[r][c].isFlagged ? prev + 1 : prev - 1);
  };

  // Kazanma kontrolü (Tüm güvenli alanlar açıldı mı?)
  const checkWin = (currentBoard) => {
    let revealedCount = 0;
    currentBoard.forEach(row => row.forEach(cell => {
      if (cell.isRevealed) revealedCount++;
    }));
    
    if (revealedCount === (ROWS * COLS) - MINES) {
      setIsWinner(true);
    }
  };

  // Rakamlara göre renk belirleme yardımcı fonksiyonu
  const getNumberColor = (num) => {
    const colors = ['#000', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#06b6d4'];
    return colors[num] || '#000';
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>💣 Mini Mayın Tarlası</h2>
      
      <div className="status">
        {isWinner ? "🎉 Tebrikler! Tüm mayınları temizledin!" : 
         isGameOver ? "💥 Boom! Mayına bastın!" : 
         `🚩 Kalan Mayın: ${MINES - flags}`}
      </div>

      <div className="mines-board" onContextMenu={(e) => e.preventDefault()}>
        {board.map((row, r) => (
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              className={`mines-cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isMine && cell.isRevealed ? 'mine' : ''}`}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
            >
              {cell.isRevealed 
                ? (cell.isMine ? '💣' : (cell.neighbor > 0 ? cell.neighbor : '')) 
                : (cell.isFlagged ? '🚩' : '')}
            </button>
          ))
        ))}
      </div>

      {(isGameOver || isWinner) && (
        <button className="reset-btn" onClick={initGame}>Yeniden Başla</button>
      )}
    </div>
  );
}
