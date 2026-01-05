import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const LionChaseGame = () => {
  const [lion, setLion] = useState([{ x: 10, y: 10 }]);
  const [steak, setSteak] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateSteak = useCallback((currentLion) => {
    let newSteak;
    do {
      newSteak = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (currentLion.some(segment => segment.x === newSteak.x && segment.y === newSteak.y));
    return newSteak;
  }, []);

  const checkCollision = useCallback((head, body) => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  const moveGame = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setLion(prevLion => {
      const head = prevLion[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      };

      if (checkCollision(newHead, prevLion.slice(1))) {
        setGameOver(true);
        return prevLion;
      }

      const newLion = [newHead, ...prevLion];

      if (newHead.x === steak.x && newHead.y === steak.y) {
        setScore(prev => prev + 1);
        setSteak(generateSteak(newLion));
        setSpeed(prev => Math.max(50, prev - 5));
        return newLion;
      }

      newLion.pop();
      return newLion;
    });
  }, [direction, steak, gameStarted, gameOver, checkCollision, generateSteak]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  useEffect(() => {
    const gameInterval = setInterval(moveGame, speed);
    return () => clearInterval(gameInterval);
  }, [moveGame, speed]);

  const resetGame = () => {
    setLion([{ x: 10, y: 10 }]);
    setSteak({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setSpeed(INITIAL_SPEED);
  };

  const handleTouchButton = (newDirection) => {
    if (!gameStarted && !gameOver) {
      setGameStarted(true);
    }

    if (newDirection.x !== 0 && direction.x === 0) {
      setDirection(newDirection);
    } else if (newDirection.y !== 0 && direction.y === 0) {
      setDirection(newDirection);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-orange-600">🦁 Lion Chase 🥩</h1>
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-gray-700">Score: {score}</span>
        </div>

        <div 
          className="relative bg-green-600 mx-auto mb-4 border-4 border-green-800 rounded"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE 
          }}
        >
          {lion.map((segment, index) => (
            <div
              key={index}
              className="absolute transition-all duration-75"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                fontSize: index === 0 ? '18px' : '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {index === 0 ? '🦁' : '🟤'}
            </div>
          ))}

          <div
            className="absolute"
            style={{
              left: steak.x * CELL_SIZE,
              top: steak.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            🥩
          </div>

          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                <p className="text-xl mb-4">Final Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
              <div className="text-center text-white">
                <p className="text-xl font-bold">Press any arrow key to start!</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use arrow keys or buttons below to control the lion
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleTouchButton({ x: 0, y: -1 })}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded text-2xl"
          >
            ↑
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleTouchButton({ x: -1, y: 0 })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded text-2xl"
            >
              ←
            </button>
            <button
              onClick={() => handleTouchButton({ x: 0, y: 1 })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded text-2xl"
            >
              ↓
            </button>
            <button
              onClick={() => handleTouchButton({ x: 1, y: 0 })}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded text-2xl"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LionChaseGame;
