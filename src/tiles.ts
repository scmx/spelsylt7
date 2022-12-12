import { Chunk, Tile } from "./chunk";
import { Entity } from "./entity";
import { InputHandler } from "./input";
import { Position } from "./position";
// import { sortBy } from "./utils";
import { Viewport } from "./viewport";

export class Tiles {
  seed: number;
  chunks = new Map<`${number}:${number}`, Chunk>();

  constructor(seed: number) {
    this.seed = seed;
  }

  update(deltaTime: number, viewport: Viewport, input: InputHandler): void {
    this.loadUnloadChunks(viewport);
    for (const [, chunk] of this.chunks)
      chunk.update(deltaTime, viewport, input);
  }

  drawTerrain(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    for (const [, chunk] of this.chunks) chunk.drawTerrain(ctx, viewport);
  }

  get entities(): Entity[] {
    return [...this.chunks.values()].flatMap((chunk) => [...chunk.obstacles]);
  }

  findTileType(pos: Position, debug = false) {
    const x = Math.floor(pos.x / Chunk.size) * Chunk.size;
    const y = Math.floor(pos.y / Chunk.size) * Chunk.size;
    const chunk = this.chunks.get(`${x}:${y}`);
    if (!chunk) return Tile.grass; //throw new Error(`Chunk not loaded for ${x}:${y}`)
    const index =
      Math.abs(Math.floor(pos.x % Chunk.size)) +
      Math.abs(Math.floor(pos.y % Chunk.size)) * Chunk.size;
    if (debug) console.log(index, chunk.tiles[index]);
    return chunk.tiles[index];
  }

  // drawObstacles(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
  //   [...this.chunks.values()]
  //     .sort(sortBy(({ pos }) => pos.x + pos.y * viewport.size.width))
  //     .forEach((chunk) => chunk.drawObstacles(ctx, viewport));
  // }

  // draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
  //   this.drawTerrain(ctx, viewport);
  //   this.drawObstacles(ctx, viewport);
  // }

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
