import { InputHandler } from "./input";
import { Position} from "./position";
import { Viewport } from "./viewport";

export interface Entity {
  pos: Position;
  nextPos?: Position;
  collisionRadius: number;

  update(deltaTime: number, viewport: Viewport, input: InputHandler): void;

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void;
}

export interface Update {
  pos: Position;
  angle?: number;
  distance?: number;
  move?(distance: number): void;
}
