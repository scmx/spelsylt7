import { Obstacle } from "./obstacle";
import { Position, PositionRange } from "./position";
import { Viewport } from "./viewport";

export class Tree implements Obstacle {
  collisionRadius = 0.3;

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
    const half = tile / 2;
    ctx.drawImage(
      image_outside,
      5 * 16,
      8 * 16,
      16,
      16 * 2,
      pos.x - half,
      pos.y - half - tile,
      tile,
      tile * 2
    );
    if (viewport.debug) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, tile * this.collisionRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }
}

declare global {
  const image_outside: HTMLImageElement;
}
