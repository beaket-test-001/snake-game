export const State = Object.freeze({
  READY: 'READY',
  RUNNING: 'RUNNING',
  GAME_OVER: 'GAME_OVER',
});

export class GameState {
  constructor(bus) { this.bus = bus; this.current = State.READY; }
  set(next) {
    if (this.current === next) return;
    const prev = this.current;
    this.current = next;
    this.bus.emit('state:change', { prev, next });
  }
  is(s) { return this.current === s; }
}
