const KEY_MAP = {
  ArrowUp: 'UP',    w: 'UP',    W: 'UP',
  ArrowDown: 'DOWN', s: 'DOWN', S: 'DOWN',
  ArrowLeft: 'LEFT', a: 'LEFT', A: 'LEFT',
  ArrowRight:'RIGHT',d: 'RIGHT',D: 'RIGHT',
};

export class InputHandler {
  constructor(bus) {
    this.bus = bus;
    window.addEventListener('keydown', this.#onKey);
  }
  #onKey = (e) => {
    if (e.key === 'r' || e.key === 'R') { this.bus.emit('input:restart'); return; }
    const dir = KEY_MAP[e.key];
    if (dir) { e.preventDefault(); this.bus.emit('input:direction', dir); }
  };
}
