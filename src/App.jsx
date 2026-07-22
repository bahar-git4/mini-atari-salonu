import { useState } from 'react';
import GirisEkrani from './games/GirisEkrani';
import TicTacToe from './games/TicTacToe';
import './App.css';
import MemoryGame from './games/MemoryGame';
import Clicker from './games/Clicker';
import Rps from './games/Rps';
import Wordle from './games/Wordle';
import Snake from './games/Snake';
import MathGame from './games/MathGame';
import ColorTrap from './games/ColorTrap';
import Jump from './games/Jump';
import Minesweeper from './games/Minesweeper';
import MoleGame from './games/MoleGame';
import Hangman from './games/Hangman';
import NameCity from './games/NameCity';

const GAMES = [
  { id: 'xox', title: 'Tic-Tac-Toe', icon: '❌⭕', desc: 'Klasik XOX oyunu', component: TicTacToe },
  { id: 'memory', title: 'Hafıza Kartları', icon: '🧠', desc: 'Emojileri eşleştir', component: MemoryGame },
  { id: 'clicker', title: 'Hızlı Tıklama', icon: '⚡', desc: '10 saniyede refleks testi', component: Clicker },
  { id: 'rps', title: 'Taş Kağıt Makas', icon: '✂️', desc: 'Bilgisayara karşı oyna', component: Rps },
  { id: 'wordle', title: 'Mini Wordle', icon: '🔤', desc: '5 harfli kelimeyi bul', component: Wordle },
  { id: 'snake', title: 'Retro Yılan', icon: '🐍', desc: 'Yemleri topla ve büyüdükçe büyün', component: Snake },
  { id: 'math', title: 'Hızlı Matematik', icon: '🧮', desc: 'Süre bitmeden hesapla', component: MathGame },
  { id: 'color', title: 'Renk Yanılsaması', icon: '🎨', desc: 'Beyin yakan renk testi', component: ColorTrap },
  { id: 'jump', title: 'Zıplayan Top', icon: '🏀', desc: 'Engellerin arasından geç', component: Jump },
  { id: 'mines', title: 'Mini Mayın Tarlası', icon: '💣', desc: 'Mayınlara basmadan ilerle', component: Minesweeper },
  { id: 'mole', title: 'Köstebek Vurmaca', icon: '🐹', desc: 'Süre bitmeden köstebekleri avla', component: MoleGame },
  { id: 'hangman', title: 'Adam Asmaca', icon: '🔤', desc: 'Gizli teknoloji kelimesini bul', component: Hangman },
  { id: 'namecity', title: 'İsim Şehir', icon: '🏙️', desc: 'Rastgele harfle kelimeler türet', component: NameCity },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeGameId, setActiveGameId] = useState(null);

  // 5 saniyelik giriş ekranı gösterimi
  if (showSplash) {
    return <GirisEkrani onGirisTamamlandi={() => setShowSplash(false)} />;
  }

  const activeGame = GAMES.find((g) => g.id === activeGameId);
  const ActiveGameComponent = activeGame?.component;

  return (
    <div className="main-layout">
      <header className="site-header">
        <h1>🎮 Mini Atari Salonu</h1>
        <p>13 Eğlenceli Oyunu Tek Sayfada Keşfet!</p>
      </header>

      <main className="container">
        {!activeGameId ? (
          <div className="game-grid">
            {GAMES.map((game) => (
              <div
                key={game.id}
                className={`card ${!game.component ? 'disabled' : ''}`}
                onClick={() => game.component && setActiveGameId(game.id)}
              >
                <div className="icon">{game.icon}</div>
                <h3>{game.title}</h3>
                <p>{game.desc}</p>
                <span className="tag">
                  {game.component ? 'Oyna ▶' : 'Hazırlanıyor...'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          ActiveGameComponent && <ActiveGameComponent onBack={() => setActiveGameId(null)} />
        )}
      </main>
    </div>
  );
}