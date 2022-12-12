import { InputHandler } from "./input";
import { InteractionManager } from "./interaction";
import { Music } from "./music";
import { NPC } from "./npc";
import { Player } from "./player";
import { Position } from "./position";
import { Tiles } from "./tiles";
import { GameState, Viewport } from "./viewport";

export class Game {
  input: InputHandler;
  player: Player;
  music: Music;
  tiles: Tiles;
  viewport: Viewport;
  interactionManager: InteractionManager;
  npcs = new Set<NPC>();

  constructor(viewport: Viewport, player: Player, music: Music) {
    this.viewport = viewport;
    this.player = player;
    this.music = music;
    this.interactionManager = new InteractionManager(
      player,
      viewport,
      this.npcs
    );
    this.input = new InputHandler(viewport);
    this.input.onFirstInteraction = () => music.play();
    this.tiles = new Tiles(1337);
    (window as any).game = this;
    menu_start_button.addEventListener("click", () => {
      viewport.gameState = GameState.playing;
      menu.close();
      viewport.offset.y = 0
    });
  }

  update(deltaTime: number): void {
    const { input, viewport } = this;
    if ([GameState.playing, GameState.menu].includes(viewport.gameState)) {
      this.viewport.update(deltaTime, input);
      this.tiles.update(deltaTime, viewport, input);
      this.player.update(deltaTime, viewport, input);

      if (Math.random() < 0.2) {
        if (this.npcs.size < 30) {
          this.npcs.add(
            new NPC({
              x: this.player.pos.x + Math.floor(Math.random() * 100 - 50),
              y: this.player.pos.y + Math.floor(Math.random() * 100 - 50),
            })
          );
        }
      }

      for (const npc of this.npcs) {
        npc.update(deltaTime, viewport);
        if (distance(npc, this.player) > 100) this.npcs.delete(npc);
      }
    }

    this.interactionManager.update(deltaTime, this.viewport, input);
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

    this.interactionManager.draw(ctx, this.viewport);
  }
}

function distance(a: WithPosition, b: WithPosition): number {
  return Math.hypot(a.pos.y - b.pos.y, a.pos.x - b.pos.x);
}

interface WithPosition {
  pos: Position;
}

declare global {
  const menu: HTMLDialogElement;
  const menu_start_button: HTMLButtonElement;
}
