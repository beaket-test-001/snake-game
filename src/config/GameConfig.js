export const GameConfig = Object.freeze({
  grid: { cols: 20, rows: 20, cellSize: 24 },
  tickMs: 120,
  snake: { initialLength: 3, startDirection: 'RIGHT' },
  colors: {
    background: '#000',
    snakeHead: '#7CFC00',
    snakeBody: '#3CB371',
    food: '#FF5555',
  },
  directions: {
    UP:    { x: 0,  y: -1 },
    DOWN:  { x: 0,  y: 1  },
    LEFT:  { x: -1, y: 0  },
    RIGHT: { x: 1,  y: 0  },
  },
  opposites: {
    UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
  },
});
