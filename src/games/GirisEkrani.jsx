import React, { useEffect } from 'react';
import '../App.css'; 

const GirisEkrani = ({ onGirisTamamlandi }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onGirisTamamlandi();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onGirisTamamlandi]);

  return (
    <div className="atari-splash-container">
      <div className="atari-content-box">
        <span className="atari-icon">🎮</span>
        <h1 className="atari-title">MİNİ-ATARİ SALONU</h1>
        <span className="atari-icon">🐰</span>
      </div>
      <p className="atari-loading-text">Yükleniyor... Lütfen Bekleyin</p>
    </div>
  );
};

export default GirisEkrani;