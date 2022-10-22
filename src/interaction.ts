import { InputHandler } from "./input";
import { NPC } from "./npc";
import { Player } from "./player";
import { Position } from "./position";
import { Viewport } from "./viewport";

export interface Interaction {}

export class InteractionManager {
  player: Player;
  npcs: Set<NPC>;
  current?: Interaction;

  constructor(player: Player, npcs: Set<NPC>) {
    this.player = player;
    this.npcs = npcs;
  }

  update(_deltaTime: number, _viewport: Viewport, input?: InputHandler) {
    if (!input) return;

    const { player } = this;

    let npcFilter: () => (npc: NPC) => boolean = () => () => false;
    if (input.keys.interact) npcFilter = () => () => true;
    else if (input?.pointers.size) {
      npcFilter = () => {
        const pointers = [...input?.pointers.values()].filter(
          (pos) => distance(pos, player.pos) < 2
        );
        return (npc) =>
          input.keys.interact || pointers.some((p) => distance(npc.pos, p) < 2);
      };
    }

    const npc = [...this.npcs]
      .filter((npc) => distance(npc.pos, player.pos) < 2)
      .find(npcFilter());
    if (!npc) return;
    if (this.current) return;
    this.current = {};
    console.log(npc);
    // for (const npc of this.npcs) {
    //   for (const [, pointer] of input?.pointers) {
    //     if (distance(pointer, this.player.pos, npc.pos) < 2) {
    const utterance = new SpeechSynthesisUtterance("Hej");
    utterance.lang = "sv-SE";
    // utterance.pitch = 2
    utterance.rate = 1;
    utterance.volume = 0.1;
    speechSynthesis.speak(utterance);
    setTimeout(() => {
      delete this.current;
    }, 4000);
  }
}

function distance(pos: Position, other: Position) {
  return Math.hypot(other.y - pos.y, other.x - pos.x);
}
