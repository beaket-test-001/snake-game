import { Vector2 } from '../core/Vector2.js';
import { GameConfig } from '../config/GameConfig.js';

export class Snake {
  constructor({ cols, rows }, length) {
    this.body = [];
    const cx = Math.floor(cols / 2);
    const cy = Math.floor(rows / 2);
    for (let i = 0; i < length; i++) this.body.push(new Vector2(cx - i, cy));
    this.direction = GameConfig.directions[GameConfig.snake.startDirection];
    this.pendingDirection = this.direction;
    this.growPending = 0;
  }
  get head() { return this.body[0]; }
  queueDirection(dirName) {
    const next = GameConfig.directions[dirName];
    const opposite = GameConfig.opposites[dirName];
    const currentDirName = Object.keys(GameConfig.directions)
      .find(k => GameConfig.directions[k] === this.direction);
    if (opposite === currentDirName) return false;
    this.pendingDirection = next;
    return true;
  }
  move() {
    this.direction = this.pendingDirection;
    const newHead = this.head.add(this.direction);
    this.body.unshift(newHead);
    if (this.growPending > 0) this.growPending--;
    else this.body.pop();
  }
  grow(n = 1) { this.growPending += n; }
  occupies(v) { return this.body.some(seg => seg.equals(v)); }
  hitsSelf() {
    const [head, ...rest] = this.body;
    return rest.some(seg => seg.equals(head));
  }
}
