import { CharacterState } from "./character";
import { collides } from "./collision";
import { Entity } from "./entity";
import { InputHandler } from "./input";
import { InteractionManager } from "./interaction";
import { Music } from "./music";
import { NPC } from "./npc";
import { Player } from "./player";
import { Tiles } from "./tiles";
import { distance, sortBy } from "./utils";
import { GameState, Viewport } from "./viewport";

export class Game {
  input: InputHandler;
  player: Player;
  music: Music;
  tiles: Tiles;
  viewport: Viewport;
  interactionManager: InteractionManager;
  npcs = new Set<NPC>();

  constructor(viewport: Viewport) {
    this.viewport = viewport;
    this.music = new Music();
    this.input = new InputHandler(viewport);
    this.player = new Player({ x: 0, y: 0 });
    this.viewport.target = this.player;
    this.interactionManager = new InteractionManager(
      this.player,
      viewport,
      this.npcs
    );
    this.input = new InputHandler(viewport);
    this.input.onFirstInteraction = () => {
      console.log("onFirstInteraction");
      this.music.play();
    };
    this.tiles = new Tiles(1337);
    (window as any).game = this;
  }

  update(deltaTime: number): void {
    const { input, viewport } = this;
    if ([GameState.playing, GameState.menu].includes(viewport.gameState)) {
      this.viewport.update(deltaTime, input);
      this.tiles.update(deltaTime, viewport, input);

      let updates = [this.player, ...this.npcs];
      for (const entity of updates)
        entity.update(deltaTime, viewport, this.input);
      updates = updates.filter((entity) => entity.nextPos);

      for (const entity of updates) {
        for (const other of updates) {
          if (entity === other) continue;

          if (collides(entity, other)) {
            delete entity.nextPos;
            delete other.nextPos;
            if (entity.state) entity.state = CharacterState.idle;
            if (other.state) other.state = CharacterState.idle;
          }
        }
      }

      updates = updates.filter((entity) => entity.nextPos);

      for (const entity of updates) {
        for (const other of this.entities) {
          if (entity === other) continue;

          if (collides(entity, other)) {
            delete entity.nextPos;
            if (entity.state) entity.state = CharacterState.idle;
          }
        }
      }

      updates = updates.filter((entity) => entity.nextPos);

      for (const entity of updates)
        if (entity.nextPos) {
          entity.pos = entity.nextPos;
          delete entity.nextPos;
        }

      // this.player.update(deltaTime, viewport, this.input);

      for (const npc of this.npcs) {
        // npc.update(deltaTime, viewport, input);
        if (distance(npc.pos, this.player.pos) > 100) this.npcs.delete(npc);
      }

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

      for (const character of [this.player]) {
        character.tileType = this.tiles.findTileType(character.pos, true);
        // console.log(character.tileType);
      }

      for (const character of [...this.npcs]) {
        character.tileType = this.tiles.findTileType(character.pos);
      }
    }

    this.interactionManager.update(deltaTime, this.viewport, input);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const { viewport } = this;
    const { width, height, mid } = viewport.canvas;
    const full = Math.min(width, height);
    const half = full / 3;

    this.tiles.drawTerrain(ctx, viewport);

    for (const entity of this.entities) entity.draw(ctx, this.viewport);

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

  get entities() {
    const { width } = this.viewport.size;
    const entities: Entity[] = [
      this.player,
      ...this.npcs,
      ...this.tiles.entities,
    ];
    return entities.sort(sortBy(({ pos }) => pos.x + pos.y * width));
  }
}

declare global {
  const menu: HTMLDialogElement;
  const menu_start_button: HTMLButtonElement;
}
