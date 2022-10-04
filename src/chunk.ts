import { Entity } from "./entity";
import { Position } from "./position";
import { Viewport } from "./viewport";

export class Chunk implements Entity {
  static size = 4;

  stale = false;
  pos: Position;
  seed: number;
  colors = Array(100)
    .fill("")
    .map(() => `hsl(${Math.floor(360 * Math.random())}, 40%, 40%)`);

  constructor({ x, y }: Position, seed: number) {
    this.pos = { x, y };
    this.seed = seed;
  }

  update(): void {
    // nothing
  }

  draw1(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    const { tile } = viewport.canvas;
    const min = viewport.resolve(this.pos);
    const size = Chunk.size * tile;
    ctx.fillStyle = this.colors[0];
    ctx.fillRect(min.x + tile, min.y + tile, size, size);
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    const { tile } = viewport.canvas;
    const min = viewport.resolve(this.pos);
    for (let i = 0; i < Chunk.size ** 2; i++) {
      const x = min.x + tile * (i % Chunk.size);
      const y = min.y + tile * Math.floor(i / Chunk.size);
      ctx.fillStyle = this.colors[i];
      ctx.fillRect(x, y, tile, tile);
    }
  }
}
