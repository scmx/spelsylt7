import { Character, CharacterMove, CharacterState } from "./character";
import { Position } from "./position";
import { Viewport } from "./viewport";

export class NPC extends Character {
  target?: Position;
  markedForDeletion = false;
  speed = sample([0.1, 0.2, 0.3, 0.4, 0.5, 0.6]);

  update(deltaTime: number, _viewport: Viewport): void {
    this.updateFrame(deltaTime, { idleStill: true });

    this.xmov = 0;
    this.ymov = 0;
    if (this.target) {
      const xd = this.target.x - this.pos.x;
      const yd = this.target.y - this.pos.y;
      if (xd < 2 && yd < 2) {
        delete this.target;
        this.xmov = 0;
        this.ymov = 0;
        this.state = CharacterState.idle;
      } else {
        this.xmov = Math.min(xd, (xd >> -1) | 1) as CharacterMove;
        this.ymov = Math.min(yd, (yd >> -1) | 1) as CharacterMove;
        this.move(deltaTime);
      }
    } else if (Math.random() < 0.01) {
      this.target = randomPositionCloserMoreLikely(this.pos);
    }
  }
}

function randomPositionCloserMoreLikely({ x, y }: Position): Position {
  return { x: x + randomExponentialOffset(), y: y + randomExponentialOffset() };
}

function randomExponentialOffset(): number {
  const val = Math.random() * 4 - 2;
  return Math.floor(val * Math.abs(val) ** 3);
}

function sample<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
