import { Position } from "./position";
import { Viewport } from "./viewport";
import tumult from "tumult";
import { InputHandler } from "./input";

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
  hoverIndexes = new Set<number>();

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

  update(_deltaTime: number, _viewport: Viewport, input: InputHandler): void {
    const { pos, max } = this;
    this.hoverIndexes.clear();
    for (const [, { x, y }] of input.pointers) {
      if (x >= pos.x && x <= max.x && y >= pos.y && y <= max.y) {
        this.hoverIndexes.add(Math.floor(y-pos.y) * Chunk.size + Math.floor(x-pos.x));
      }
    }
    // if (this.hoverIndexes.size > 0) {
    // console.log(this.hoverIndexes)
    // debugger
    // }
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    const { tile: tileSize } = viewport.canvas;
    const min = viewport.resolve(this.pos);
    for (let i = 0; i < Chunk.size ** 2; i++) {
      const x = min.x + tileSize * (i % Chunk.size);
      const y = min.y + tileSize * Math.floor(i / Chunk.size);
      const tile = this.tiles[i];

      if (viewport.debug) {
        ctx.fillStyle = `hsl(${Math.floor(
          this.noise[i] * 180 + 180
        )}, 100%, 50%)`;
        ctx.fillRect(x, y, tileSize + 1, tileSize + 1);
      } else if (tile === Tile.grass) {
        ctx.fillStyle = "#83cd56";
        ctx.fillRect(x, y, tileSize + 1, tileSize + 1);
      } else {
        const frame = {
          [Tile.grass]: { x: 2, y: 9 },
          [Tile.sand]: { x: 51, y: 1 },
          [Tile.water]: { x: 1, y: 9 },
        }[tile];
        ctx.drawImage(
          image_terrain,
          frame.x * 16,
          frame.y * 16,
          16,
          16,
          x,
          y,
          tileSize + 1,
          tileSize + 1
        );
      }
      if (this.hoverIndexes.has(i)) {
        ctx.fillStyle=`rgba(255, 255, 255, 0.3)`
        ctx.fillRect(x, y, tileSize + 1, tileSize + 1);
      }
    }
  }

  get max() {
    return { x: this.pos.x + Chunk.size, y: this.pos.y + Chunk.size };
  }
}

declare global {
  const image_terrain: HTMLImageElement;
}
