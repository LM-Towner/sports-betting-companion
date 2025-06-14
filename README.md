# 🧠 Bet Buddy

[🌐 Live Demo](https://sports-betting-companion.vercel.app/)

**Bet Buddy** is a beginner-friendly sports betting companion app that helps users understand odds, bet types, and strategies — without risking real money. Designed as a hands-on learning platform, Bet Buddy makes sports betting approachable, interactive, and even a little fun.

---

## 📸 Screenshots

> _Screenshots coming soon!_

<!--
![Home Page](./screenshots/home.png)
![Odds Calculator](./screenshots/calculator.png)
![Glossary](./screenshots/glossary.png)
-->

---

## ✨ Features

### 1. 🧮 Odds Calculator
- Supports **American**, **Decimal**, and **Fractional** odds formats.
- Input validation for all formats to prevent errors.
- Calculates **implied probability** and **potential payout** instantly.
- Allows **pre-filling odds and stake** from glossary terms.

### 2. 📘 Interactive Glossary
- Searchable glossary of common betting terms.
- Each term includes:
  - Emoji & category tag
  - Clear definition
  - Real-world example
  - "Try This Term" → Prefills calculator with sample odds/stake
  - Interactive quiz with instant feedback
- Progress tracking: mark terms as learned and view a progress bar.
- Surprise Me + Quick Tip buttons for exploration and engagement.

### 3. 🖼️ UI/UX Enhancements
- Fully responsive and mobile-friendly.
- Tailwind CSS-based layout with **custom theming**.
- Dark mode toggle with user preference persistence.
- Only one glossary card can be expanded at a time for clean UX.
- Custom favicon and page title ("BB – Bet Buddy").

### 4. 🛠️ Technical Stack & Structure
- **React 18 + Vite + TypeScript**
- Tailwind CSS (with PostCSS and custom colors)
- Feature-based folder structure (`features/calculator`, `features/glossary`, etc.)
- React Router for navigation
- State managed with hooks and `localStorage`
- Fully typed glossary data via TypeScript module
- Error boundary + loading spinner for a robust experience

---

## 🧪 Tech Stack

- React + Vite + TypeScript
- Tailwind CSS (Dark mode + custom theme)
- React Router
- LocalStorage for user progress
- Framer Motion (optional animations)

---

## 🚀 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/bet-buddy.git
   cd bet-buddy
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the dev server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Preview production build:**
   ```bash
   npm run preview
   ```
6. **Visit:**  
   [http://localhost:5173](http://localhost:5173) (or as shown in your terminal)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

This project is [MIT](./LICENSE) licensed.
