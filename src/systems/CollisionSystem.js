import { GameConfig } from '../config/GameConfig.js';

export class CollisionSystem {
  constructor(snake) { this.snake = snake; }
  check() {
    const { cols, rows } = GameConfig.grid;
    const h = this.snake.head;
    const outOfBounds = h.x < 0 || h.y < 0 || h.x >= cols || h.y >= rows;
    if (outOfBounds) return { dead: true, reason: 'WALL' };
    if (this.snake.hitsSelf()) return { dead: true, reason: 'SELF' };
    return { dead: false };
  }
}
