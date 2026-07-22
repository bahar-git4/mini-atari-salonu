import { useState, useEffect } from 'react';

// 8 çift emoji ile 16 kartlık bir deste oluşturuyoruz
const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export default function MemoryGame({ onBack }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);

  // Oyun başladığında kartları karıştırıp dağıtan fonksiyon
  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  // Bileşen ekrana ilk geldiğinde oyunu başlat
  useEffect(() => {
    initializeGame();
  }, []);

  // Kart eşleşme mantığını kontrol eden Effect
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.emoji === secondCard.emoji) {
        // Eşleşme başarılıysa kartları 'matched' (eşleşti) olarak işaretle
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setFlippedIndices([]); // Yeni seçim için temizle
      } else {
        // Eşleşme yoksa 1 saniye sonra kartları geri kapat
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    // Eğer kart zaten açıksa, eşleşmişse veya zaten 2 kart açıksa tıklamayı yoksay
    if (
      cards[index].isMatched ||
      flippedIndices.includes(index) ||
      flippedIndices.length === 2
    ) {
      return;
    }
    setFlippedIndices((prev) => [...prev, index]);
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🧠 Hafıza Kartları</h2>
      
      <div className="status">
        {matchedPairs === EMOJIS.length 
          ? `🎉 Tebrikler! ${moves} hamlede bitirdin.` 
          : `Hamle: ${moves} | Eşleşen: ${matchedPairs}/${EMOJIS.length}`}
      </div>

      <div className="memory-board">
        {cards.map((card, index) => {
          const isVisible = card.isMatched || flippedIndices.includes(index);
          return (
            <button
              key={card.id}
              className={`memory-card ${isVisible ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {isVisible ? card.emoji : '❓'}
            </button>
          );
        })}
      </div>

      <button className="reset-btn" onClick={initializeGame}>Yeniden Başlat</button>
    </div>
  );
}