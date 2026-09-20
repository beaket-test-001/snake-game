export class ScoreSystem {
  constructor(bus) {
    this.bus = bus;
    this.score = 0;
    this.bus.on('food:eaten', () => {
      this.score++;
      this.bus.emit('score:change', this.score);
    });
  }
  reset() { this.score = 0; this.bus.emit('score:change', this.score); }
}
