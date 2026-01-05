# 🦁 Lion Chase Game

A modern take on the classic Snake game, built with React and featuring smooth animations and responsive controls. Guide a hungry lion to catch T-bone steaks while avoiding collisions with walls and its own growing body.

## 🎮 Live Demo

[Play the game here](https://YOUR-USERNAME.github.io/lion-chase-game)

## 🎯 Features

- **Progressive Difficulty**: Game speed increases with each steak consumed
- **Responsive Controls**: Support for both keyboard and touch inputs
- **Score Tracking**: Real-time score display with persistent gameplay
- **Collision Detection**: Robust boundary and self-collision algorithms
- **Clean UI**: Modern design with smooth animations and visual feedback

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Running Locally

1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/lion-chase-game.git
cd lion-chase-game
```

2. Open `index.html` in your browser
```bash
open index.html  # macOS
start index.html # Windows
```

That's it! No build process or dependencies to install.

## 🎮 How to Play

- Use **arrow keys** or **on-screen buttons** to control the lion
- Eat T-bone steaks 🥩 to grow longer and increase your score
- Avoid hitting walls or your own body
- The game speeds up as you progress - how high can you score?

## 🛠️ Built With

- **React 18** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **Vanilla JavaScript** - Game logic and state management

## 📁 Project Structure

```
lion-chase-game/
├── index.html          # Entry point and HTML structure
├── game.js            # React component with game logic
└── README.md          # Project documentation
```

## 🧠 Technical Highlights

- **State Management**: Efficient React hooks for game state and rendering
- **Game Loop**: Custom interval-based game loop with dynamic speed adjustment
- **Collision System**: Grid-based collision detection for walls and self-collision
- **Procedural Generation**: Random steak placement with collision avoidance
- **Input Handling**: Multi-input system supporting keyboard and touch events

## 🎨 Customization

The game can be easily customized by modifying constants in `game.js`:

```javascript
const GRID_SIZE = 20;        // Grid dimensions
const CELL_SIZE = 20;        // Cell size in pixels
const INITIAL_SPEED = 150;   // Starting game speed (ms)
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.


## 🙏 Acknowledgments

- Inspired by the classic Snake game
- Built as a demonstration of modern web development practices
- Thanks to the React and Tailwind CSS communities

---

⭐ Star this repo if you enjoyed the game!
