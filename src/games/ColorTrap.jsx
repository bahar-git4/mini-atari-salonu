import { useState, useEffect } from 'react';

// Kullanacağımız renk veri seti
const COLORS = [
  { name: 'KIRMIZI', hex: '#ef4444' }, // red
  { name: 'MAVİ', hex: '#3b82f6' },    // blue
  { name: 'YEŞİL', hex: '#10b981' },   // green
  { name: 'SARI', hex: '#eab308' },    // yellow
  { name: 'MOR', hex: '#a855f7' },     // purple
];

export default function ColorTrap({ onBack }) {
  const [targetWord, setTargetWord] = useState('');     // Ekranda yazacak KELİME (örn: SARI)
  const [targetColor, setTargetColor] = useState('');   // Ekranda kelimenin RENGİ (örn: #ef4444)
  const [shuffledOptions, setShuffledOptions] = useState([]); // Alttaki butonlar
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateQuestion = () => {
    // 1. Rastgele bir kelime seç (Anlamı için)
    const randomWord = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // 2. Rastgele bir renk seç (Görüntüsü için) - Çoğunlukla farklı olması daha eğlencelidir
    let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    setTargetWord(randomWord.name);
    setTargetColor(randomColor.hex);

    // 3. Butonları karıştırıp seçenekleri hazırla
    // Seçenekler her zaman sabit 5 renktir, sadece sıraları değişir
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setIsPlaying(true);
    generateQuestion();
  };

  // Zamanlayıcı Effect'i
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleColorClick = (clickedColorHex) => {
    if (!isPlaying) return;

    // Oyuncu, KELİMENİN ANLAMINA değil, RENGİNE (targetColor) tıklamalı!
    if (clickedColorHex === targetColor) {
      setScore((prev) => prev + 10);
      generateQuestion();
    } else {
      // Yanlış cevapta 2 saniye ceza
      setTimeLeft((prev) => Math.max(prev - 2, 0));
      // Yine de yeni soru gelsin ki oyun akıcı olsun
      generateQuestion();
    }
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🎨 Renk Yanılsaması</h2>
      
      <div className="status">
        {isPlaying || timeLeft > 0 
          ? `⏱️ Süre: ${timeLeft}s | 🎯 Skor: ${score}` 
          : `Oyun Bitti! Toplam Skorun: ${score} 🏆`}
      </div>

      {!isPlaying && timeLeft === 20 ? (
        <button className="reset-btn" onClick={startGame}>Oyuna Başla</button>
      ) : (
        <div className="color-trap-area">
          <p className="color-hint">Yazının <strong>RENGİNİ</strong> seç, anlamını değil!</p>
          
          <div 
            className="color-target-word" 
            style={{ color: targetColor }}
          >
            {targetWord}
          </div>

          <div className="color-options">
            {shuffledOptions.map((opt, i) => (
              <button
                key={i}
                className="color-btn"
                style={{ backgroundColor: opt.hex }}
                onClick={() => handleColorClick(opt.hex)}
                disabled={!isPlaying}
              >
                {/* Butonların üstüne de renklerin isimlerini yazıyoruz (kafa karışıklığı x2) */}
                {opt.name} 
              </button>
            ))}
          </div>
        </div>
      )}

      {!isPlaying && timeLeft === 0 && (
        <button className="reset-btn" onClick={startGame}>Tekrar Dene</button>
      )}
    </div>
  );
}