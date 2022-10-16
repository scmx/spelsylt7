import { Position } from "./position";
import { Viewport } from "./viewport";
import tumult from "tumult";

const perlin = new tumult.Perlin2("seed");

enum Tile {
  water = "water",
  sand = "sand",
  grass = "grass",
}

export class Chunk {
  static size = 16;

  stale = false;
  pos: Position;
  seed: number;
  noise: number[];
  tiles: Tile[];

  constructor({ x, y }: Position, seed: number) {
    this.pos = { x, y };
    this.seed = seed;
    this.noise = Array(Chunk.size ** 2)
      .fill("")
      .map((_, index) => {
        return perlin.gen(
          Math.abs((2000 + x + (index % Chunk.size)) / 32),
          Math.abs((2000 + y + Math.floor(index / Chunk.size)) / 32)
        );
      });
    this.tiles = this.noise.map((n) => {
      return n < 0.15 ? Tile.grass : n > 0.19 ? Tile.water : Tile.sand;
    });
  }

  update(_deltaTime: number, _viewport: Viewport): void {
    // nothing
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    const { tile } = viewport.canvas;
    const min = viewport.resolve(this.pos);
    for (let i = 0; i < Chunk.size ** 2; i++) {
      const x = min.x + tile * (i % Chunk.size);
      const y = min.y + tile * Math.floor(i / Chunk.size);
      if (!viewport.debug) {
        const tile = this.tiles[i];
        ctx.fillStyle = {
          [Tile.grass]: "green",
          [Tile.sand]: "yellow",
          [Tile.water]: "blue",
        }[tile];
      } else {
        ctx.fillStyle = `hsl(${Math.floor(
          this.noise[i] * 180 + 180
        )}, 100%, 50%)`;
      }
      ctx.fillRect(x, y, tile + 1, tile + 1);
    }
  }
}
