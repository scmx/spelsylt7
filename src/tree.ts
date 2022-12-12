import { Obstacle } from "./obstacle";
import { Position, PositionRange } from "./position";
import { Viewport } from "./viewport";

export class Tree implements Obstacle {
  pos: Position;
  collision: PositionRange;

  constructor({ x, y }: Position) {
    const min = (this.pos = { x, y });
    const max = { x: x + 1, y: y + 1 };
    this.collision = { min, max };
  }

  update(_deltaTime: number, _viewport: Viewport): void { }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    const { tile } = viewport.canvas;
    const pos = viewport.resolve(this.pos);
    ctx.drawImage(
      image_outside,
      5 * 16,
      8 * 16,
      16,
      16 * 2,
      pos.x,
      pos.y -tile,
      tile,
      tile * 2
    );
  }
}

declare global {
  const image_outside: HTMLImageElement;
}
