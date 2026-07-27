# 🕹️ Mini Atari Salonu (Retro Game Collection)

> 90'ların o unutulmaz atari salonu atmosferini modern web teknolojileriyle tarayıcınıza getiren nostaljik bir koleksiyon uygulaması. React kullanılarak geliştirilen bu platformda, giriş ekranı ve her biri ayrı birer bileşen yapısında olan 14 farklı interaktif sayfa/oyun bulunmaktadır.

---

## 🚀 Canlı Önizleme
Projenin yayındaki haline buradan ulaşarak oyunları deneyebilirsiniz: **[Live Demo Linki Buraya Eklenecek]**

---

## 🛠️ Kullanılan Teknolojiler

Bu projenin geliştirilmesinde aşağıdaki modern teknolojiler ve araçlar kullanılmıştır:

* **Frontend Framework:** React.js (Vite)
* **Programlama Dili:** JavaScript (ES6+)
* **Stil Yönetimi:** CSS3 / Modüler Tasarım
* **State Yönetimi:** React Hooks (`useState`, `useEffect`)
* **Yönlendirme & Bileşen Mimarisi:** Modüler React Component Yapısı

---

## 🎮 Proje İçeriği ve Oyun Listesi

Platformda kullanıcıyı karşılayan özel bir giriş ekranı ve aktif olarak oynanabilen **13 farklı mini oyun** yer almaktadır:

1. **GirisEkrani:** Karşılama ve salonuna giriş arayüzü.
2. **Clicker (`Clicker.jsx`):** Hızlı tıklama beceri testi.
3. **ColorTrap (`ColorTrap.jsx`):** Renk ve algı refleks oyunu.
4. **Hangman (`Hangman.jsx`):** Klasik kelime tahmin ve adam asmaca.
5. **Jump (`Jump.jsx`):** Engellerin üzerinden zıplama tabanlı refleks oyunu.
6. **MathGame (`MathGame.jsx`):** Zamana karşı hızlı işlem çözme bulmacası.
7. **MemoryGame (`MemoryGame.jsx`):** Kart eşleştirme hafıza testi.
8. **Minesweeper (`Mineseper.jsx`):** Klasik mayın tarlası bulmacası.
9. **MoleGame (`MoleGame.jsx`):** Köstebek vurmaca hızı.
10. **NameCity (`NameCity.jsx`):** Kelime ve şehir bilgi oyunu.
11. **RPS (`Rps.jsx`):** Bilgisayara karşı Taş, Kağıt, Makas.
12. **Snake (`Snake.jsx`):** Nostaljik yılan büyütmece klasiği.
13. **TicTacToe (`TicTacToe.jsx`):** Stratejik XOX oyunu.
14. **Wordle (`Wordle.jsx`):** Popüler kelime bulmaca oyunu.

---

## 📂 Proje Dosya Yapısı

Proje, sürdürülebilirlik ve temiz kod prensibine uygun olarak şu yapıdadır:

```text
mini-atari-salon/
├── public/             # Statik varlıklar
├── src/
│   ├── components/     # Oyun bileşenleri ve ekranlar
│   │   ├── Clicker.jsx
│   │   ├── ColorTrap.jsx
│   │   ├── GirisEkrani.jsx
│   │   ├── Hangman.jsx
│   │   ├── Jump.jsx
│   │   ├── MathGame.jsx
│   │   ├── MemoryGame.jsx
│   │   ├── Mineseper.jsx
│   │   ├── MoleGame.jsx
│   │   ├── NameCity.jsx
│   │   ├── Rps.jsx
│   │   ├── Snake.jsx
│   │   ├── TicTacToe.jsx
│   │   └── Wordle.jsx
│   ├── App.jsx         # Ana yönlendirme ve ekran yönetimi
│   ├── main.jsx
│   └── index.css       # Genel stiller
├── package.json
└── README.md
