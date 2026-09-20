import { Vector2 } from '../core/Vector2.js';

export class Food {
  constructor(position) { this.position = position; }
  static spawnRandom({ cols, rows }, isOccupied) {
    const free = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = new Vector2(x, y);
        if (!isOccupied(v)) free.push(v);
      }
    }
    if (free.length === 0) return null;
    return new Food(free[Math.floor(Math.random() * free.length)]);
  }
}
