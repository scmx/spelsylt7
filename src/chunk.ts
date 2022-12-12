import { Position } from "./position";
import { Viewport } from "./viewport";
import tumult from "tumult";
import { InputHandler } from "./input";
import { Obstacle } from "./obstacle";
import { Tree } from "./tree";

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
  obstacles = new Set<Obstacle>();

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
    // const treeCount = Math.floor(Math.random() * 8);
    const trees = this.noise
      .map((n, i) => [n, i])
      .filter(
        ([n]) => n < 0.01 && Math.random() ** n < 1.5 && Math.random() < 0.1
      )
      .map(([, i]) => ({
        x: x + (i % Chunk.size),
        y: y + Math.floor(i / Chunk.size),
      }))
      .map((pos) => new Tree(pos));
    for (const tree of trees) this.obstacles.add(tree);
    // const trees = this.tiles.map((tile, index) => [tile, index]).filter(([tile]) => tile === Tile.grass && Math.random() > 0.5)
    // for (let i = 0; i < treeCount; i++){
    //   const pos = randomPos(x, y, Chunk.size, Chunk.size)
    //   const index = pos.x + pos.y
    //   if
    //   this.obstacles.add(new Tree(pos));
    // }
  }

  update(_deltaTime: number, _viewport: Viewport, input: InputHandler): void {
    const { pos, max } = this;
    this.hoverIndexes.clear();
    for (const [, { x, y }] of input.pointers) {
      if (x >= pos.x && x <= max.x && y >= pos.y && y <= max.y) {
        this.hoverIndexes.add(
          Math.floor(y - pos.y) * Chunk.size + Math.floor(x - pos.x)
        );
      }
    }
    // if (this.hoverIndexes.size > 0) {
    // console.log(this.hoverIndexes)
    // debugger
    // }
  }

  drawTerrain(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
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
        ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
        ctx.fillRect(x, y, tileSize + 1, tileSize + 1);
      }
    }
  }

  drawObstacles(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    for (const obstacle of this.obstacles) obstacle.draw(ctx, viewport);
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    this.drawTerrain(ctx, viewport)
    this.drawObstacles(ctx, viewport)
  }

  get max() {
    return { x: this.pos.x + Chunk.size, y: this.pos.y + Chunk.size };
  }
}

function randomPos(x: number, y: number, width: number, height: number) {
  return {
    x: x + Math.floor(Math.random() * width),
    y: y + Math.floor(Math.random() * height),
  };
}

declare global {
  const image_terrain: HTMLImageElement;
}
