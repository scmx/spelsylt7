import { InputHandler } from "./input";
import { Player } from "./player";
import { Tiles } from "./tiles";
import { Viewport } from "./viewport";

export class Game {
  input = new InputHandler();

  player: Player;
  tiles: Tiles;
  viewport: Viewport;

  constructor(viewport: Viewport, player: Player) {
    this.viewport = viewport;
    this.player = player;
    this.tiles = new Tiles(1337);
  }

  update(deltaTime: number): void {
    const { input, viewport } = this;
    this.viewport.update(deltaTime, input);
    this.tiles.update(deltaTime, viewport);
    this.player.update(deltaTime, viewport, input);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { viewport } = this;
    const { width, height, mid } = viewport.canvas;
    const full = Math.min(width, height);
    const half = full / 3;
    this.tiles.draw(ctx, viewport);
    this.player.draw(ctx, viewport);
    const grd = ctx.createRadialGradient(
      mid.x,
      mid.y,
      half,
      mid.x,
      mid.y,
      full
    );
    grd.addColorStop(0.9, "black");
    grd.addColorStop(0.4, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }
}
