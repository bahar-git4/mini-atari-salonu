import { useState } from 'react';

const CHOICES = [
  { id: 'rock', icon: '✊', name: 'Taş' },
  { id: 'paper', icon: '🖐️', name: 'Kağıt' },
  { id: 'scissors', icon: '✌️', name: 'Makas' }
];

export default function Rps({ onBack }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const playGame = (playerSelection) => {
    // Bilgisayar için rastgele bir seçim yap
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    const computerSelection = CHOICES[randomIndex];

    setPlayerChoice(playerSelection);
    setComputerChoice(computerSelection);
    determineWinner(playerSelection.id, computerSelection.id);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult('Berabere! 🤝');
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setResult('Kazandın! 🎉');
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('Kaybettin! 😢');
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0 });
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>✂️ Taş Kağıt Makas</h2>
      
      <div className="status">
        Skor: Sen {score.player} - {score.computer} Bilgisayar
      </div>

      <div className="rps-arena">
        <div className="player-area">
          <h3>Sen</h3>
          <div className="choice-display">
            {playerChoice ? playerChoice.icon : '❓'}
          </div>
        </div>
        
        <div className="vs-text">VS</div>
        
        <div className="computer-area">
          <h3>Bilgisayar</h3>
          <div className="choice-display">
            {computerChoice ? computerChoice.icon : '❓'}
          </div>
        </div>
      </div>

      <div className="result-text">{result || 'Hamleni Seç!'}</div>

      <div className="rps-controls">
        {CHOICES.map((choice) => (
          <button 
            key={choice.id} 
            className="rps-btn"
            onClick={() => playGame(choice)}
          >
            {choice.icon} {choice.name}
          </button>
        ))}
      </div>

      {score.player > 0 || score.computer > 0 ? (
        <button className="reset-btn" onClick={resetScore}>Skoru Sıfırla</button>
      ) : null}
    </div>
  );
}
