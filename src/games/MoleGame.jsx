import { useState, useEffect } from 'react';

export default function MoleGame({ onBack }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [activeMole, setActiveMole] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Oyun Zamanlayıcıları
  useEffect(() => {
    let gameTimer;
    let moleTimer;

    if (isPlaying && timeLeft > 0) {
      // 1. Genel süreyi saniyede bir azalt
      gameTimer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      // 2. Köstebeği her 700 milisaniyede bir başka deliğe taşı
      moleTimer = setInterval(() => {
        setActiveMole(Math.floor(Math.random() * 9)); // 0 ile 8 arası rastgele indeks
      }, 700);

    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setActiveMole(null);
    }

    // Bileşen ekrandan kalktığında veya state değiştiğinde eski sayaçları temizle
    return () => {
      clearInterval(gameTimer);
      clearInterval(moleTimer);
    };
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setIsPlaying(true);
    setActiveMole(Math.floor(Math.random() * 9));
  };

  const whack = (index) => {
    if (!isPlaying) return;

    // Eğer tıklanan delikte köstebek varsa
    if (index === activeMole) {
      setScore((prev) => prev + 10);
      setActiveMole(null); // Köstebek vuruldu, anında kaybolsun (çift tıklamayı engeller)
    }
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🐹 Köstebek Vurmaca</h2>
      
      <div className="status">
        {isPlaying || timeLeft > 0 
          ? `⏱️ Süre: ${timeLeft}s | 🎯 Skor: ${score}` 
          : `Oyun Bitti! Toplam Skor: ${score} 🏆`}
      </div>

      <div className="mole-board">
        {/* 9 tane delik (hole) oluşturuyoruz */}
        {Array.from({ length: 9 }).map((_, index) => (
          <div 
            key={index} 
            className={`mole-hole ${activeMole === index ? 'active' : ''}`}
            onClick={() => whack(index)}
          >
            {/* Sadece aktif olan delikte köstebek emojisini gösteriyoruz */}
            {activeMole === index ? '🐹' : ''}
          </div>
        ))}
      </div>

      {!isPlaying && (
        <button className="reset-btn" onClick={startGame}>
          {timeLeft === 20 ? 'Oyuna Başla' : 'Yeniden Oyna'}
        </button>
      )}
    </div>
  );
}
    
