import { InputHandler } from "./input";
import { Position } from "./position";

const dpr = window.devicePixelRatio;

enum GameMode {
  normal = "normal",
  god = "god",
}

export enum GameState {
  menu = 'menu',
  playing = 'playing',
  interaction = 'interaction'
}

const ZOOM = {
  normal: {
    min: 0.4,
    max: 6,
    start: 1,
    speed: 0.05,
  },
  god: {
    min: 0.4,
    max: 20,
    start: 20,
    speed: 0.08,
  },
};

export class Viewport {
  /** viewport zoom level */
  zoom = 1;

  gameMode = GameMode.normal;
  gameState = GameState.menu;

  debug = false;

  /** viewport offset from player in number of blocks */
  offset = { x: 0, y: 2 };
  /** viewport size in number of blocks */
  size = { width: 0, height: 0 };

  /* ratio between width and height */
  ratio = 1;

  canvas = {
    width: innerWidth,
    height: innerHeight,
    tile: 80,
    mid: { x: innerWidth / 2, y: innerHeight / 2 },
  };

  ctx: CanvasRenderingContext2D;
  target: Target;

  constructor(ctx: CanvasRenderingContext2D, target: Target) {
    this.ctx = ctx;
    this.target = target;

    addEventListener("resize", this._resize);

    this._resize();
    this._updateZoom(this.zoom);
  }

  update(_deltaTime: number, input: InputHandler): void {
    if (input.keys.space) {
      const { min, max, speed } = ZOOM[this.gameMode];
      const modifier = 1 + (input.keys.shift ? -speed : speed);
      this._updateZoom(Math.max(min, Math.min(max, this.zoom * modifier)));
    }
  }

  resolve(pos: Position) {
    const x = (pos.x - this.min.x) * this.canvas.tile;
    const y = (pos.y - this.min.y) * this.canvas.tile;
    return { x, y };
  }

  unresolve({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }): Position {
    const x = clientX / this.canvas.tile;
    const y = clientY / this.canvas.tile;
    return { x, y };
  }

  get min() {
    const mid = this.target.pos;
    const { width, height } = this.size;
    const { offset } = this;
    const x = mid.x + offset.x - width / 2;
    const y = mid.y + offset.y - height / 2;
    return { x, y };
  }

  get max() {
    const mid = this.target.pos;
    const { width, height } = this.size;
    const { offset } = this;
    const x = mid.x + offset.x + width / 2;
    const y = mid.y + offset.y + height / 2;
    return { x, y };
  }

  _resize = () => {
    this.ctx.canvas.style.width = `${innerWidth}px`;
    this.ctx.canvas.style.height = `${innerHeight - 7}px`;
    this.canvas.width = this.ctx.canvas.width = dpr * innerWidth;
    this.canvas.height = this.ctx.canvas.height = dpr * (innerHeight - 7);
    this.canvas.mid = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.canvas.tile = this.canvas.width / this.size.width;
    this.ratio = this.ctx.canvas.width / this.ctx.canvas.height;
    this.ctx.imageSmoothingEnabled = false;
    this._updateZoom(this.zoom);
  };

  _updateZoom(zoom: number) {
    this.zoom = zoom;
    const area = 100 * this.zoom ** 2;
    const width = Math.sqrt(area * this.ratio);
    this.size = { width, height: area / width };
    this.canvas.tile = this.canvas.width / width;
  }

  toggleGameMode() {
    if (this.gameMode === GameMode.normal) {
      this.gameMode = GameMode.god;
    } else {
      this.gameMode = GameMode.normal;
    }
    this.zoom = ZOOM[this.gameMode].start;
    this._updateZoom(this.zoom);
  }
}

interface Target {
  pos: Position;
}
