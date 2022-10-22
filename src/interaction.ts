import { CharacterFacing, CharacterState } from "./character";
import { InputHandler } from "./input";
import { NPC } from "./npc";
import { Player } from "./player";
import { Position } from "./position";
import { GameState, Viewport } from "./viewport";

const diactx = dialog_canvas.getContext("2d")!;

let voices: SpeechSynthesisVoice[] = [];
try {
  speechSynthesis.cancel();
  voices = speechSynthesis.getVoices();
} catch (err) {
  console.error(err);
}
console.log(voices);

// export interface Interaction { }

export class InteractionManager {
  player: Player;
  viewport: Viewport;
  npcs: Set<NPC>;
  current?: NPC;

  constructor(player: Player, viewport: Viewport, npcs: Set<NPC>) {
    this.player = player;
    this.viewport = viewport;
    this.npcs = npcs;
    dialog_no_button.addEventListener("click", () => {
      delete this.current;
      dialog.close();
      viewport.gameState = GameState.playing
    });
  }

  update(deltaTime: number, viewport: Viewport, input?: InputHandler) {
    this.current?.updateFrame(deltaTime);
    if (input) {
      const { player } = this;

      let npcFilter: () => (npc: NPC) => boolean = () => () => false;
      if (input.keys.interact) npcFilter = () => () => true;
      else if (input?.pointers.size) {
        npcFilter = () => {
          const pointers = [...input?.pointers.values()].filter(
            (pos) => distance(pos, player.pos) < 2
          );
          return (npc) =>
            input.keys.interact ||
            pointers.some((p) => distance(npc.pos, p) < 2);
        };
      }

      const npc = [...this.npcs]
        .filter((npc) => distance(npc.pos, player.pos) < 2)
        .find(npcFilter());
      if (!npc) return;
      if (this.current) return;
      viewport.gameState = GameState.interaction;
      this.current = npc;
      this.current.state = CharacterState.idle;
      this.current.facing = CharacterFacing.down;
      dialog.showModal();
      let message = sample(["Hello", "Hi", "Howdie"]);
      dialog_content.textContent = message;
      let utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "sv-SE";
      // utterance.voice = voices.find(
      //     (v) => v.lang === "en-US" || v.lang === "en-GB"
      //   )!;
      // utterance.pitch = 2
      // utterance.rate = 1;
      // utterance.volume = 0.3;
      speechSynthesis.speak(utterance);
      setTimeout(() => {
        message = sample([
          "Can you fix my computer?",
          "The thing seems to be broken..",
          "It broke, can you fix it?",
        ]);
        dialog_content.textContent = message;
        utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
      }, 2000);
      // delete this.current;
    }
  }

  draw(_ctx: CanvasRenderingContext2D, _viewport: Viewport) {
    if (this.current) {
      diactx.clearRect(0, 0, dialog_canvas.width, dialog_canvas.height);
      diactx.imageSmoothingEnabled = false;
      this.current.drawAt(diactx, { x: 70, y: 70 }, 128);
    }
  }
}

function distance(pos: Position, other: Position) {
  return Math.hypot(other.y - pos.y, other.x - pos.x);
}

// const conversations = {
//   hello: {
//     answer: ["can"],
//   },
// };

function sample<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

declare global {
  const dialog: HTMLDialogElement;
  const dialog_content: HTMLDivElement;
  const dialog_canvas: HTMLCanvasElement;
  const dialog_no_button: HTMLButtonElement;
  const dialog_ok_button: HTMLButtonElement;
}
