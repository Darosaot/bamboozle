# 🍼 Bamboozle Baby Deluxe

> "¡El juego donde las reglas no importan y los puntos son inventados!"

A fun and chaotic trivia game about babies, pregnancy, and parenting. Test your knowledge with crazy questions, power-ups, and WICKED WANGO cards!

## 🎮 Features

- **Two Game Modes**: Solo or 2-Player competitive mode
- **Three Difficulty Levels**: Easy, Normal, and Hard
- **Power-Ups**: 50/50, Time Freeze, and Skip
- **Wango Cards**: Random events that can help or hurt you
- **Sabotage Cards**: (2-Player mode) Mess with your opponent
- **Over 70 Questions**: About babies, pregnancy, and parenting

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
bamboozle/
├── src/
│   ├── components/        # React components
│   │   ├── ModeSelection.jsx
│   │   ├── PlayerSetup.jsx
│   │   ├── GameScreen.jsx
│   │   ├── ResultsScreen.jsx
│   │   ├── PlayerStats.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── WangoCard.jsx
│   │   ├── SabotageCard.jsx
│   │   ├── PowerUps.jsx
│   │   └── RoundInfo.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── usePlayer.js
│   │   ├── useQuestions.js
│   │   └── useTimer.js
│   ├── data/              # Game data
│   │   ├── questions.js
│   │   ├── wangoCards.js
│   │   └── sabotageCards.js
│   ├── utils/             # Utility functions
│   │   ├── cardEffects.js
│   │   └── scoreCalculator.js
│   ├── constants/         # Game configuration
│   │   └── gameConfig.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── netlify.toml         # Netlify configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🌐 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Your site will be live!

Or use the Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🎯 How to Play

1. **Choose Game Mode**: Solo or 2-Player
2. **Enter Player Names**: Set your name(s) and difficulty
3. **Answer Questions**: You have limited time to answer each question
4. **Use Power-Ups**: Strategically use 50/50, Time Freeze, or Skip
5. **Wango Cards**: Random events that shake up the game
6. **Win**: Get the highest score or survive the longest!

## 🏗️ Built With

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for parents and parents-to-be everywhere!