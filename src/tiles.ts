import { Chunk } from "./chunk";
import { Entity } from "./entity";
import { InputHandler } from "./input";
import { Viewport } from "./viewport";

export class Tiles implements Entity {
  seed: number;
  chunks = new Map<`${number}:${number}`, Chunk>();

  constructor(seed: number) {
    this.seed = seed;
  }

  update(deltaTime: number, viewport: Viewport, input: InputHandler): void {
    this.loadUnloadChunks(viewport);
    for (const [, chunk] of this.chunks) chunk.update(deltaTime, viewport, input);
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    for (const [, chunk] of this.chunks) chunk.draw(ctx, viewport);
  }

  loadUnloadChunks(viewport: Viewport) {
    const { min, max } = viewport;
    for (const [, chunk] of this.chunks) chunk.stale = true;

    const minX = Math.floor(min.x / Chunk.size) * Chunk.size;
    const minY = Math.floor(min.y / Chunk.size) * Chunk.size;
    const maxX = Math.floor(max.x / Chunk.size) * Chunk.size;
    const maxY = Math.floor(max.y / Chunk.size) * Chunk.size;

    for (let y = minY; y <= maxY; y += Chunk.size) {
      for (let x = minX; x <= maxX; x += Chunk.size) {
        const key: `${number}:${number}` = `${x}:${y}`;
        const chunk = this.chunks.get(key);
        if (chunk) chunk.stale = false;
        else this.chunks.set(key, new Chunk({ x, y }, this.seed));
      }
    }
    for (const [key, chunk] of this.chunks)
      if (chunk.stale) this.chunks.delete(key);
  }
}
