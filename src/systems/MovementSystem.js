export class MovementSystem {
  constructor(snake) { this.snake = snake; }
  update() { this.snake.move(); }
}
