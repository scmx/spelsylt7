import { Viewport } from "./viewport";

export interface Entity {
  update(deltaTime: number, viewport: Viewport): void;
  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void;
}
