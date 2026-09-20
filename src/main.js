import { EventBus } from './core/EventBus.js';
import { GameLoop } from './core/GameLoop.js';
import { GameState, State } from './core/GameState.js';
import { Snake } from './entities/Snake.js';
import { MovementSystem } from './systems/MovementSystem.js';
import { CollisionSystem } from './systems/CollisionSystem.js';
import { FoodSystem } from './systems/FoodSystem.js';
import { ScoreSystem } from './systems/ScoreSystem.js';
import { InputHandler } from './input/InputHandler.js';
import { CanvasRenderer } from './render/CanvasRenderer.js';
import { HUD } from './ui/HUD.js';
import { GameConfig } from './config/GameConfig.js';

class Game {
  constructor() {
    this.bus = new EventBus();
    this.state = new GameState(this.bus);
    this.renderer = new CanvasRenderer(document.getElementById('game'));
    this.hud = new HUD(document.getElementById('hud'), this.bus);
    this.input = new InputHandler(this.bus);
    this.score = new ScoreSystem(this.bus);
    this.loop = new GameLoop(GameConfig.tickMs, () => this.tick());

    this.bus.on('input:direction', dir => {
      if (this.state.is(State.RUNNING)) this.snake.queueDirection(dir);
    });
    this.bus.on('input:restart', () => this.reset());

    this.reset();
    this.loop.start();
    this.render();
  }
  reset() {
    this.snake = new Snake(GameConfig.grid, GameConfig.snake.initialLength);
    this.movement = new MovementSystem(this.snake);
    this.collision = new CollisionSystem(this.snake);
    this.foodSystem = new FoodSystem(this.snake, this.bus);
    this.foodSystem.spawn();
    this.score.reset();
    this.state.set(State.RUNNING);
  }
  tick() {
    if (!this.state.is(State.RUNNING)) return;
    this.movement.update();
    const { dead } = this.collision.check();
    if (dead) { this.state.set(State.GAME_OVER); return; }
    this.foodSystem.checkEat();
    this.render();
  }
  render() {
    this.renderer.render({
      snake: this.snake,
      food: this.foodSystem.food,
      state: this.state.current,
    });
  }
}

new Game();
