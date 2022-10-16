import { InputHandler } from "./input";
import { NPC } from "./npc";
import { Player } from "./player";
import { Position } from "./position";
import { Tiles } from "./tiles";
import { Viewport } from "./viewport";

export class Game {
  input = new InputHandler();

  player: Player;
  tiles: Tiles;
  viewport: Viewport;
  npcs = new Set<NPC>();

  constructor(viewport: Viewport, player: Player) {
    this.viewport = viewport;
    this.player = player;
    this.tiles = new Tiles(1337);
    (window as any).game = this;
  }

  update(deltaTime: number): void {
    const { input, viewport } = this;
    this.viewport.update(deltaTime, input);
    this.tiles.update(deltaTime, viewport);
    this.player.update(deltaTime, viewport, input);

    if (Math.random() < 0.2) {
      if (this.npcs.size < 300) {
        this.npcs.add(
          new NPC({
            x: this.player.pos.x + Math.floor(Math.random() * 20 - 10),
            y: this.player.pos.y + Math.floor(Math.random() * 20 - 10),
          })
        );
      }
    }

    for (const npc of this.npcs) {
      npc.update(deltaTime, viewport);
      if (distance(npc, this.player) > 20) this.npcs.delete(npc); //.markedForDeletion = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { viewport } = this;
    const { width, height, mid } = viewport.canvas;
    const full = Math.min(width, height);
    const half = full / 3;

    this.tiles.draw(ctx, viewport);
    this.player.draw(ctx, viewport);
    for (const npc of this.npcs) npc.draw(ctx, viewport);

    const grd = ctx.createRadialGradient(
      mid.x,
      mid.y,
      half,
      mid.x,
      mid.y,
      full
    );
    grd.addColorStop(0.9, "rgba(0, 0, 0, 0.3)");
    grd.addColorStop(0.4, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }
}

function distance(a: WithPosition, b: WithPosition): number {
  return Math.hypot(a.pos.y - b.pos.y, a.pos.x - b.pos.x);
}

interface WithPosition {
  pos: Position;
}
