export class InputHandler {
  keys: Record<Keys, boolean> = { ...initialKeys };

  constructor() {
    addEventListener("keydown", this.onKeydown);
    addEventListener("keyup", this.onKeyup);
    addEventListener("blur", this.onBlur);
  }

  onKeydown = (event: KeyboardEvent) => {
    for (const [name, keys] of KEYS) {
      if (keys.has(event.code)) this.keys[name] = true;
    }
  };

  onKeyup = (event: KeyboardEvent) => {
    for (const [name, keys] of KEYS) {
      if (keys.has(event.code)) this.keys[name] = false;
    }
  };

  onBlur = () => {
    this.keys = { ...initialKeys };
  };
}

type Keys = "up" | "left" | "down" | "right" | "space" | "shift";

const initialKeys = {
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
  shift: false,
};

const KEYS = new Map<Keys, Set<string>>([
  ["up", new Set(["ArrowUp", "KeyW"])],
  ["left", new Set(["ArrowLeft", "KeyA"])],
  ["down", new Set(["ArrowDown", "KeyS"])],
  ["right", new Set(["ArrowRight", "KeyD"])],
  ["space", new Set(["Space"])],
  ["shift", new Set(["ShiftLeft", "ShiftRight"])],
]);
