import { useState, useEffect, useRef } from 'react';

export default function MathGame({ onBack }) {
    const[num1, setNum1] = useState(0);
    const[num2, setNum2] = useState(0);
    const[operator, setOparetor] = useState('+');
    const[userAnswer, setUserAnswer] = useState('');
    const[score, setScore] = useState(0);
    const[timeLeft, setTimeLeft] = useState(15);
    const[isPlaying, setIsPlaying] = useState(false);

    //Input alanına odaklanmak için
    const inputRef = useRef(null);

    const generateQuestion = () =>{
        const ops = ['+', '-','x'];
        const selectedOp = ops[Math.floor(Math.random() * ops.length)];
       
        let n1, n2;
        if(selectedOp === 'x'){
            //Çarpma için daha küçük sayılar (1-10)
            n1=Math.floor(Math.random() * 10) + 1;
            n2=Math.floor(Math.random() * 10) + 1;
        } else{
            //Toplama ve çıkarma için 1-50 arası sayılar
            n1 = Math.floor(Math.random() * 50) + 1;
            n2 = Math.floor(Math.random() * 50) + 1;

            //çıkarma sonucunda negatif çıkmasını istemiyorsak büyük olanı n1 yapıyoruz
            if (selectedOp === '-' && n2 > n1){
                [n1, n2] = [n2, n1];
            }
        }
        setNum1(n1);
        setNum2(n2);
        setOparetor,(selectedOp);
    };
    const startGame = () =>{
        setScore(0);
        setTimeLeft(15);
        setIsPlaying(true);
        setUserAnswer('')
        generateQuestion();
        setTimeout(()=> inputRef.current?.focus(), 100);
    };
    //zamanlayıcı efekti 
    useEffect(()=> {
        let timer;
        if(isPlaying && timeLeft > 0){
            timer = setInterval(()=>{
                setTimeLeft((prev)=> prev-1);
}, 1000);
        }else if (timeLeft === 0){
            setIsPlaying(false);
        }
        return () => clearInterval(timer);
}, [isPlaying, timeLeft]);

//Form gönderildiğinde netera basıldığında
const handleSubmit = (e)=>{
    e.preventDefault();
    if(!isPlaying || !userAnswer) return;

    let correctAnswer = 0;
    if (operator === '+') correctAnswer = num1 + num2;
    if (operator === '-') correctAnswer = num1 - num2;
    if (operator === 'x') correctAnswer = num1 * num2;

    if (parseInt(userAnswer)=== correctAnswer){
        setScore((prev)=>prev + 10);
        //doğrıu cevapta süreyi 3 saniye arttır (maksimum 20 saniye kuralı koyalım)
        setTimeLeft((prev) => Math.min(prev + 3, 20));
        generateQuestion();
        setUserAnswer('');
    }else{
        //yanlış cevapta sadece inputu temizle
        setUserAnswer('');
    }
};
return (
    <div className="game-box">
      <button className="back-btn" onClick={onBack}>← Ana Menüye Dön</button>
      <h2>🧮 Hızlı Matematik</h2>
      
      <div className="status">
        {isPlaying || timeLeft > 0 
          ? `⏱️ Süre: ${timeLeft}s | 🎯 Skor: ${score}` 
          : `Oyun Bitti! Toplam Skorun: ${score} 🏆`}
      </div>

      {!isPlaying && timeLeft === 15 ? (
        <button className="reset-btn" onClick={startGame}>Oyuna Başla</button>
      ) : (
        <form onSubmit={handleSubmit} className="math-form">
          <div className="math-problem">
            {num1} {operator} {num2} = ?
          </div>
          <input
            ref={inputRef}
            type="number"
            className="math-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={!isPlaying}
            placeholder={isPlaying ? "Cevabını yaz..." : "Süre bitti"}
            autoComplete="off"
          />
          {isPlaying && (
            <p className="math-hint">Cevapla ve Enter'a bas!</p>
          )}
        </form>
      )}

      {!isPlaying && timeLeft === 0 && (
        <button className="reset-btn" onClick={startGame}>Tekrar Dene</button>
      )}
    </div>
  );
}




