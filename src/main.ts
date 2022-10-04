import { Character } from "./character";
import { InputHandler } from "./input";
import "./style.css";
import { Viewport } from "./viewport";

function init() {
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false;

  const character = new Character({ x: 0, y: 0 });
  const viewport = new Viewport(ctx, character);
  const input = new InputHandler();

  let lastTime = 0;
  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.draw(ctx, viewport);
    character.update(deltaTime, viewport, input);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // function resize() {
  //   const size = Math.min(innerWidth, innerHeight);
  //   canvas.width = canvas.height = size * 2;
  //   canvas.style.width = canvas.style.height = `${size}px`;
  //   viewport.zoom = size / 64;
  // }
  // addEventListener("resize", resize);
}

init();

declare global {
  const canvas: HTMLCanvasElement;
}
