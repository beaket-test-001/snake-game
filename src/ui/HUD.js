export class HUD {
  constructor(el, bus) {
    this.el = el;
    bus.on('score:change', score => { this.el.textContent = `Score: ${score}`; });
  }
}
