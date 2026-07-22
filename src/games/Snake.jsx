import { useState, useEffect } from 'react';

// Oyun alanımızın boyutu (20x20 kare)
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Yukarı doğru başlar
const INITIAL_SPEED = 150; // Milisaniye cinsinden hız

export default function Snake({ onBack }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Rastgele yeni yem oluşturma
  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  // Klavye yönlendirmeleri
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Yön tuşlarına basıldığında sayfanın kaymasını engelle
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      setDirection((prevDir) => {
        switch (e.key) {
          case 'ArrowUp':
            return prevDir.y === 1 ? prevDir : { x: 0, y: -1 };
          case 'ArrowDown':
            return prevDir.y === -1 ? prevDir : { x: 0, y: 1 };
          case 'ArrowLeft':
            return prevDir.x === 1 ? prevDir : { x: -1, y: 0 };
          case 'ArrowRight':
            return prevDir.x === -1 ? prevDir : { x: 1, y: 0 };
          default:
            return prevDir;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Oyun Döngüsü (Game Loop)
  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // Duvara çarpma kontrolü
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Kendine çarpma kontrolü
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Yem yeme kontrolü
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood());
          // Yem yediğinde kuyruğu silmiyoruz (yılan uzuyor)
        } else {
          // Yem yemediğinde son kuyruk parçasını sil (hareket efekti)
          newSnake.pop();
        }

        return newSnake;
      });
    };

    // Yılanın hareketini belirli aralıklarla tetikle
    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [direction, food, isGameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🐍 Retro Yılan</h2>
      
      <div className="status">
        {isGameOver ? `Oyun Bitti! Skorun: ${score}` : `Skor: ${score}`}
      </div>

      <div className="snake-board">
        {/* 20x20'lik ızgarayı çizmek için içi boş bir div matrisi oluşturuyoruz */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div 
              key={i} 
              className={`snake-cell ${isSnake ? 'snake-body' : ''} ${isHead ? 'snake-head' : ''} ${isFood ? 'snake-food' : ''}`}
            />
          );
        })}
      </div>

      {isGameOver && (
        <button className="reset-btn" onClick={resetGame}>Yeniden Oyna</button>
      )}
    </div>
  );
}