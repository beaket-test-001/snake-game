export class GameLoop {
  constructor(tickMs, onTick) {
    this.tickMs = tickMs;
    this.onTick = onTick;
    this.accumulator = 0;
    this.lastTime = 0;
    this.rafId = null;
    this.running = false;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.#frame(this.lastTime);
  }
  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
  #frame = (now) => {
    if (!this.running) return;
    const delta = now - this.lastTime;
    this.lastTime = now;
    this.accumulator += delta;
    while (this.accumulator >= this.tickMs) {
      this.onTick();
      this.accumulator -= this.tickMs;
    }
    this.rafId = requestAnimationFrame(this.#frame);
  };
}
