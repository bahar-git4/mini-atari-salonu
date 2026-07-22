import { useState, useEffect } from 'react';

// YBS ve Teknoloji terimleri havuzu
const WORDS = ["YAZILIM", "VERİTABANI", "ALGORİTMA", "SİSTEM", "SUNUCU", "KODLAMA", "DONANIM", "GÜVENLİK", "BİLİŞİM", "ANALİZ"];
const ALPHABET = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('');
const MAX_MISTAKES = 6;

export default function Hangman({ onBack }) {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const initGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setMistakes(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || isGameOver || isWinner) return;

    setGuessedLetters((prev) => [...prev, letter]);
    
    if (!word.includes(letter)) {
      setMistakes((prev) => prev + 1);
    }
  };

  // Kazanma ve Kaybetme Durumları
  const isWinner = word && word.split('').every((letter) => guessedLetters.includes(letter));
  const isGameOver = mistakes >= MAX_MISTAKES;

  // Adam çizimi (Hata sayısına göre ASCII art)
  const hangmanArt = [
    `\n\n\n\n\n___|___`, // 0 hata
    `   |\n   |\n   |\n   |\n   |\n___|___`, // 1 hata
    `   _____\n   |/  |\n   |\n   |\n   |\n___|___`, // 2 hata
    `   _____\n   |/  |\n   |   O\n   |\n   |\n___|___`, // 3 hata
    `   _____\n   |/  |\n   |   O\n   |   |\n   |\n___|___`, // 4 hata
    `   _____\n   |/  |\n   |   O\n   |  /|\\\n   |\n___|___`, // 5 hata
    `   _____\n   |/  |\n   |   O\n   |  /|\\\n   |  / \\\n___|___` // 6 hata (Öldü)
  ];

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🔤 Adam Asmaca</h2>
      
      <div className="status">
        {isWinner ? "🎉 Tebrikler! Kelimeyi Buldun." : 
         isGameOver ? `💀 Bilemedin! Kelime: ${word}` : 
         `Kalan Can: ${MAX_MISTAKES - mistakes}`}
      </div>

      <pre className="hangman-drawing">
        {hangmanArt[mistakes]}
      </pre>

      <div className="hangman-word">
        {word.split('').map((letter, i) => (
          <span key={i} className="hangman-letter">
            {guessedLetters.includes(letter) || isGameOver ? letter : '_'}
          </span>
        ))}
      </div>

      <div className="hangman-keyboard">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            className={`hangman-key ${guessedLetters.includes(letter) ? 'used' : ''}`}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isGameOver || isWinner}
          >
            {letter}
          </button>
        ))}
      </div>

      {(isWinner || isGameOver) && (
        <button className="reset-btn" onClick={initGame} style={{ marginTop: '1rem' }}>
          Yeni Kelime
        </button>
      )}
    </div>
  );
}