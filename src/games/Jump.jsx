import { useState, useEffect } from 'react';

// Oyunun fizik kuralları ve sabit boyutları
const GAME_WIDTH = 300;
const GAME_HEIGHT = 400;
const GRAVITY = 0.6;          // Yerçekimi kuvveti
const JUMP_STRENGTH = -8;     // Zıplama gücü (Yukarı gitmesi için eksi değer)
const OBSTACLE_WIDTH = 40;
const OBSTACLE_SPEED = 5;
const GAP_SIZE = 130;         // Engellerin arasındaki boşluk
const BALL_SIZE = 24;
const BALL_X = 40;            // Topun yataydaki sabit konumu

export default function Jump({ onBack }) {
  // Tüm oyun durumunu tek bir State'te tutuyoruz ki saniyede 50 kere güncellerken senkronizasyon bozulmasın
  const [gameState, setGameState] = useState({
    ballY: 200,
    velocity: 0,
    obX: GAME_WIDTH,
    gapTop: 100,
    score: 0,
    isPlaying: false,
    isGameOver: false,
  });

  // Oyun Döngüsü (Game Loop)
  useEffect(() => {
    let interval;
    
    if (gameState.isPlaying && !gameState.isGameOver) {
      interval = setInterval(() => {
        setGameState((prev) => {
          // 1. Yeni fiziksel değerleri hesapla
          let newV = prev.velocity + GRAVITY;
          let newY = prev.ballY + newV;
          let newObX = prev.obX - OBSTACLE_SPEED;
          let newScore = prev.score;
          let newGapTop = prev.gapTop;
          let isOver = false;

          // 2. Yere veya tavana çarpma kontrolü
          if (newY > GAME_HEIGHT - BALL_SIZE || newY < 0) {
            isOver = true;
          }

          // 3. Engel ekrandan çıktıysa başa sar ve skoru artır
          if (newObX < -OBSTACLE_WIDTH) {
            newObX = GAME_WIDTH;
            // Yeni engelin boşluk yüksekliğini rastgele belirle
            newGapTop = Math.random() * (GAME_HEIGHT - GAP_SIZE - 40) + 20;
            newScore += 1;
          }

          // 4. Engele çarpma kontrolü
          const inObstacleX = newObX < BALL_X + BALL_SIZE && newObX + OBSTACLE_WIDTH > BALL_X;
          const inObstacleTop = newY < newGapTop;
          const inObstacleBottom = newY + BALL_SIZE > newGapTop + GAP_SIZE;

          if (inObstacleX && (inObstacleTop || inObstacleBottom)) {
            isOver = true;
          }

          return {
            ...prev,
            ballY: newY,
            velocity: newV,
            obX: newObX,
            gapTop: newGapTop,
            score: newScore,
            isGameOver: isOver,
            isPlaying: !isOver,
          };
        });
      }, 20); // Saniyede 50 kare (50 FPS)
    }

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.isGameOver]);

  // Ekrana tıklama veya Boşluk tuşuna basma eylemi
  const handleJump = () => {
    if (gameState.isGameOver) return;
    
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      velocity: JUMP_STRENGTH,
    }));
  };

  const resetGame = () => {
    setGameState({
      ballY: 200,
      velocity: 0,
      obX: GAME_WIDTH,
      gapTop: 100,
      score: 0,
      isPlaying: false,
      isGameOver: false,
    });
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🏀 Zıplayan Top</h2>
      
      <div className="status">
        {gameState.isGameOver ? `Oyun Bitti! Skor: ${gameState.score}` : `Skor: ${gameState.score}`}
      </div>

      <div 
        className="jump-arena" 
        onClick={handleJump}
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Zıplayan Topumuz */}
        <div 
          className="jump-ball"
          style={{ top: gameState.ballY, left: BALL_X, width: BALL_SIZE, height: BALL_SIZE }}
        >
          ⚽
        </div>

        {/* Üst Engel */}
        <div 
          className="jump-obstacle top"
          style={{ left: gameState.obX, width: OBSTACLE_WIDTH, height: gameState.gapTop }}
        />

        {/* Alt Engel */}
        <div 
          className="jump-obstacle bottom"
          style={{ 
            left: gameState.obX, 
            width: OBSTACLE_WIDTH, 
            height: GAME_HEIGHT - gameState.gapTop - GAP_SIZE,
            top: gameState.gapTop + GAP_SIZE
          }}
        />

        {!gameState.isPlaying && !gameState.isGameOver && (
          <div className="jump-start-text">Zıplamak için tıkla!</div>
        )}
      </div>

      {gameState.isGameOver && (
        <button className="reset-btn" onClick={resetGame}>Yeniden Başla</button>
      )}
    </div>
  );
}


