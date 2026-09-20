import { Renderer } from './Renderer.js';
import { GameConfig } from '../config/GameConfig.js';

export class CanvasRenderer extends Renderer {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    const { cols, rows, cellSize } = GameConfig.grid;
    canvas.width  = cols * cellSize;
    canvas.height = rows * cellSize;
    this.ctx = canvas.getContext('2d');
  }
  clear() {
    const { cols, rows, cellSize } = GameConfig.grid;
    this.ctx.fillStyle = GameConfig.colors.background;
    this.ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);
    this.#grid();
  }
  #grid() {
    const { cols, rows, cellSize } = GameConfig.grid;
    this.ctx.strokeStyle = '#222';
    this.ctx.beginPath();
    for (let x = 0; x <= cols; x++) {
      this.ctx.moveTo(x * cellSize, 0);
      this.ctx.lineTo(x * cellSize, rows * cellSize);
    }
    for (let y = 0; y <= rows; y++) {
      this.ctx.moveTo(0, y * cellSize);
      this.ctx.lineTo(cols * cellSize, y * cellSize);
    }
    this.ctx.stroke();
  }
  render({ snake, food, state }) {
    this.clear();
    if (food) this.#cell(food.position, GameConfig.colors.food);
    snake.body.forEach((seg, i) => {
      const color = i === 0 ? GameConfig.colors.snakeHead : GameConfig.colors.snakeBody;
      this.#cell(seg, color);
    });
    if (state === 'GAME_OVER') this.#overlay('GAME OVER — press R');
  }
  #cell(v, color) {
    const { cellSize } = GameConfig.grid;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(v.x * cellSize + 1, v.y * cellSize + 1, cellSize - 2, cellSize - 2);
  }
  #overlay(text) {
    const { cols, rows, cellSize } = GameConfig.grid;
    this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
    this.ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, cols * cellSize / 2, rows * cellSize / 2);
  }
}
