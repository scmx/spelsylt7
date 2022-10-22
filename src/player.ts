import { Character } from "./character";
import { InputHandler } from "./input";
import { Position } from "./position";
import { Viewport } from "./viewport";

export class Player extends Character {
  speed = 1;

  constructor({ x, y }: Position) {
    super({ x, y });
    this.tool = "keyboard";
  }

  update(deltaTime: number, viewport: Viewport, input?: InputHandler): void {
    this.updateFrame(deltaTime);

    if (input?.pointers.size){
      for (const [, target] of input?.pointers) this.target = target;
    }

    this.xmov = 0;
    this.ymov = 0;

    if (input) {
      const { up, left, down, right } = input.keys;
      this.xmov = left && !right ? -1 : !left && right ? 1 : 0;
      this.ymov = up && !down ? -1 : !up && down ? 1 : 0;
    }
    const speed = viewport.gameMode === "god" ? 20 : 1;
    if (!this.xmov && !this.ymov && this.target) {
      this.pointToTarget()
    }
    this.move(deltaTime, speed);
  }
}
