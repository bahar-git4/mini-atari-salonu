import { useState, useEffect } from 'react';

// 5 harfli kelime havuzumuz
const WORDS = ["KODLA", "EKRAN", "BİLGİ", "PROJE", "KURAL", "VERİM", "TABLO", "İŞLEM", "METİN", "SAYFA", "VİRÜS", "Damla"];
const MAX_GUESSES = 6;

export default function Wordle({ onBack }) {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');

  // Oyun başladığında rastgele bir kelime seç
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(randomWord);
    setGuesses(Array(MAX_GUESSES).fill(null));
    setCurrentGuess('');
    setIsGameOver(false);
    setMessage('');
  };

  // Klavye olaylarını dinleme
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isGameOver) return;

      if (event.key === 'Enter') {
        if (currentGuess.length !== 5) {
          setMessage('Kelime 5 harfli olmalı!');
          setTimeout(() => setMessage(''), 2000);
          return;
        }
        
        // Tahmini kaydet
        const newGuesses = [...guesses];
        const emptyIndex = newGuesses.findIndex((val) => val === null);
        newGuesses[emptyIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        // Kazanma veya Kaybetme durumu
        if (currentGuess === solution) {
          setIsGameOver(true);
          setMessage('🎉 Harika, buldun!');
        } else if (emptyIndex === MAX_GUESSES - 1) {
          setIsGameOver(true);
          setMessage(`Üzgünüm, kelime şuydu: ${solution}`);
        }
      }

      if (event.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      // Sadece harfleri kabul et (Türkçe karakter desteği ile)
      if (/^[a-zA-ZğüşıöçĞÜŞİÖÇ]$/.test(event.key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => (prev + event.key).toLocaleUpperCase('TR'));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, isGameOver, solution, guesses]);

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🔤 Mini Wordle</h2>
      
      <div className="status" style={{ minHeight: '30px' }}>
        {message || 'Klavyeni kullanarak 5 harfli bir kelime yaz ve Enter\'a bas'}
      </div>

      <div className="wordle-board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val === null);
          return (
            <WordleRow 
              key={i} 
              guess={isCurrentGuess ? currentGuess : guess} 
              solution={solution} 
              isSubmitted={guess !== null} 
            />
          );
        })}
      </div>

      {isGameOver && (
        <button className="reset-btn" onClick={startNewGame}>Yeni Kelime</button>
      )}
    </div>
  );
}

// Her bir satırı çizen alt bileşen
function WordleRow({ guess, solution, isSubmitted }) {
  const tiles = [];
  const guessChars = guess ? guess.split('') : [];
  
  for (let i = 0; i < 5; i++) {
    const char = guessChars[i] || '';
    let status = '';

    if (isSubmitted) {
      if (char === solution[i]) {
        status = 'correct'; // Yeşil
      } else if (solution.includes(char)) {
        status = 'present'; // Sarı
      } else {
        status = 'absent';  // Gri
      }
    }

    tiles.push(
      <div key={i} className={`wordle-tile ${status} ${char ? 'filled' : ''}`}>
        {char}
      </div>
    );
  }

  return <div className="wordle-row">{tiles}</div>;
}