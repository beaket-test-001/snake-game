import { Food } from '../entities/Food.js';
import { GameConfig } from '../config/GameConfig.js';

export class FoodSystem {
  constructor(snake, bus) { this.snake = snake; this.bus = bus; this.food = null; }
  spawn() {
    this.food = Food.spawnRandom(GameConfig.grid, v => this.snake.occupies(v));
    this.bus.emit('food:spawned', this.food);
  }
  checkEat() {
    if (!this.food) return false;
    if (this.snake.head.equals(this.food.position)) {
      this.snake.grow(1);
      this.bus.emit('food:eaten', this.food);
      this.spawn();
      return true;
    }
    return false;
  }
}
