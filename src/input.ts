import { Position } from "./position";
import { Viewport } from "./viewport";

export class InputHandler {
  keys: Record<Keys, boolean> = { ...initialKeys };
  pointers = new Map<number, Position>();
  viewport: Viewport;
  _hasInteracted = false;
  onFirstInteraction?: () => void;

  constructor(viewport: Viewport) {
    this.viewport = viewport;
    addEventListener("keydown", this.onKeydown);
    addEventListener("keyup", this.onKeyup);
    addEventListener("blur", this.onBlur);
    addEventListener("pointerdown", this.onPointerDown, { passive: false });
    addEventListener("pointermove", this.onPointerMove, { passive: false });
    addEventListener("pointerup", this.onPointerUp, { passive: false });
    addEventListener("pointerleave", this.onPointerLeave, { passive: false });
    addEventListener("pointerout", this.onPointerLeave, { passive: false });
    addEventListener("pointercancel", this.onPointerLeave, { passive: false });
    // document.addEventListener("touchstart", touchstartHandler, {
    //   passive: false,
    // });
    document.addEventListener("touchmove", touchmoveHandler, {
      passive: false,
    });
    // function touchstartHandler(_event: TouchEvent) {
    //   // event.preventDefault();
    // }
    function touchmoveHandler(event: TouchEvent) {
      event.preventDefault();
    }
  }

  onKeydown = (event: KeyboardEvent) => {
    this.hasInteracted();
    for (const [name, keys] of KEYS) {
      if (keys.has(event.code)) this.keys[name] = true;
    }
  };

  onKeyup = (event: KeyboardEvent) => {
    this.hasInteracted();
    for (const [name, keys] of KEYS) {
      if (keys.has(event.code)) this.keys[name] = false;
    }
  };

  onBlur = () => {
    this.keys = { ...initialKeys };
  };

  onPointerDown = (event: PointerEvent) => {
    this.hasInteracted();
    const { clientX, clientY } = event;
    const { canvas, min } = this.viewport;
    const x = (clientX * window.devicePixelRatio) / canvas.tile + min.x;
    const y = (clientY * window.devicePixelRatio) / canvas.tile + min.y;
    this.pointers.set(event.pointerId, { x, y });
  };

  onPointerMove = (event: PointerEvent) => {
    if (event.pressure < 0.5) return;
    const { clientX, clientY } = event;
    const { canvas, min } = this.viewport;
    const x = (clientX * window.devicePixelRatio) / canvas.tile + min.x;
    const y = (clientY * window.devicePixelRatio) / canvas.tile + min.y;
    this.pointers.set(event.pointerId, { x, y });
  };

  onPointerUp = (event: PointerEvent) => {
    this.pointers.delete(event.pointerId);
  };

  onPointerLeave = (event: PointerEvent) => {
    this.hasInteracted();
    this.pointers.delete(event.pointerId);
  };

  hasInteracted() {
    if (this._hasInteracted) return;
    this._hasInteracted = true;
    this.onFirstInteraction?.();
  }
}

type Keys = "up" | "left" | "down" | "right" | "space" | "shift" | "interact";

const initialKeys = {
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
  shift: false,
  interact: false,
};

const KEYS = new Map<Keys, Set<string>>([
  ["up", new Set(["ArrowUp", "KeyW"])],
  ["left", new Set(["ArrowLeft", "KeyA"])],
  ["down", new Set(["ArrowDown", "KeyS"])],
  ["right", new Set(["ArrowRight", "KeyD"])],
  ["space", new Set(["Space"])],
  ["shift", new Set(["ShiftLeft", "ShiftRight"])],
  ["interact", new Set(["KeyE"])],
]);
