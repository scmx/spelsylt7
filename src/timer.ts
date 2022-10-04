export class Timer {
  value = 0;

  interval: number;

  constructor(interval: number) {
    this.interval = interval;
  }

  update(deltaTime: number): boolean {
    if (this.value < this.interval) {
      this.value += deltaTime;
      return false;
    }
    this.value = 0;
    return true;
  }
}
