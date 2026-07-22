import { useState, useEffect } from 'react';

export default function Clicker({ onBack }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);

  // Geri sayım mantığını yöneten Effect
  useEffect(() => {
    let timer;
    // Eğer oyun oynanıyorsa ve süre 0'dan büyükse her 1 saniyede bir süreyi azalt
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Süre bittiyse oyunu durdur
      setIsPlaying(false);
    }
    
    // Bileşen ekrandan kalkarsa veya Effect yeniden çalışırsa eski interval'i temizle (Memory leak'i önler)
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsPlaying(true);
  };

  const handleClick = () => {
    if (isPlaying) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>⚡ Hızlı Tıklama</h2>
      
      <div className="status">
        {timeLeft > 0 
          ? `⏱️ Süre: ${timeLeft}s | 🎯 Skor: ${score}` 
          : `Oyun Bitti! Toplam Skorun: ${score} 🏆`}
      </div>

      {!isPlaying && timeLeft === 10 ? (
        <button className="clicker-btn start" onClick={startGame}>
          Oyuna Başla
        </button>
      ) : (
        <button 
          className={`clicker-btn ${isPlaying ? 'active' : 'game-over'}`} 
          onClick={handleClick}
          disabled={!isPlaying}
        >
          {isPlaying ? 'TIKLA!' : 'Süre Bitti'}
        </button>
      )}

      {!isPlaying && timeLeft === 0 && (
        <button className="reset-btn" onClick={startGame}>Tekrar Dene</button>
      )}
    </div>
  );
}