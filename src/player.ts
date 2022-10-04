import { Character } from "./character";
import { InputHandler } from "./input";
import { Position } from "./position";
import { Viewport } from "./viewport";

export class Player extends Character {
  speed = 1;

  constructor({ x, y }: Position) {
    super({ x, y });
  }

  update(deltaTime: number, viewport: Viewport, input?: InputHandler): void {
    super.update(deltaTime, viewport);

    if (input) {
      const { up, left, down, right } = input.keys;

      const xmov = left && !right ? -1 : !left && right ? 1 : 0;
      const ymov = up && !down ? -1 : !up && down ? 1 : 0;
      this.move(deltaTime, xmov, ymov);
    }
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    super.draw(ctx, viewport);
  }
}
