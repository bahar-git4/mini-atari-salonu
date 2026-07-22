import { useState, useEffect } from 'react';

const LETTERS = ["A","B","C","Ç","D","E","F","G","H","İ","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];
const TIME_LIMIT = 60;

export default function NameCity({ onBack }) {
  const [letter, setLetter] = useState('?');
  const [answers, setAnswers] = useState({ isim: '', sehir: '', hayvan: '', bitki: '', esya: '' });
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    setAnswers({ isim: '', sehir: '', hayvan: '', bitki: '', esya: '' });
    setTimeLeft(TIME_LIMIT);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      finishGame(); // Süre bitince otomatik hesapla
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleInputChange = (category, value) => {
    setAnswers(prev => ({ ...prev, [category]: value.toLocaleUpperCase('TR') }));
  };

  const finishGame = () => {
    setIsPlaying(false);
    let calculatedScore = 0;

    Object.values(answers).forEach((val) => {
      if (val.trim() !== '' && val.startsWith(letter)) {
        calculatedScore += 10;
      }
    });

    setScore(calculatedScore);
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🏙️ İsim Şehir (60 Saniye)</h2>
      
      <div className="status">
        {isPlaying 
          ? `⏱️ Süre: ${timeLeft}s | Hedef Harf: ${letter}` 
          : letter !== '?' ? `Oyun Bitti! Puan: ${score}/50` : 'Başlamak için aşağıdaki butona tıkla'}
      </div>

      <div className="namecity-form">
        <div className="target-letter-box" style={{ background: isPlaying ? '#0ea5e9' : '#475569' }}>
          Harf: <strong>{letter}</strong>
        </div>
        
        {Object.keys(answers).map((key) => (
          <div key={key} className="namecity-input-group">
            <label>{key.toUpperCase()}:</label>
            <input 
              type="text" 
              value={answers[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
              disabled={!isPlaying}
              placeholder={isPlaying ? `${letter} ile başlayan bir ${key}...` : 'Oyun bekleniyor...'}
            />
          </div>
        ))}
      </div>

      {isPlaying ? (
        <button className="reset-btn" onClick={finishGame} style={{ background: '#10b981', marginTop: '1rem' }}>
          Bitir ve Hesapla
        </button>
      ) : (
        <button className="reset-btn" onClick={startGame} style={{ marginTop: '1rem' }}>
          {letter !== '?' ? 'Yeniden Oyna' : 'Oyuna Başla'}
        </button>
      )}
    </div>
  );
}