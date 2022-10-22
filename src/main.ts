import { Game } from "./game";
import { Music } from "./music";
import { Player } from "./player";
import "./style.css";
import { Viewport } from "./viewport";

function init() {
  const ctx = canvas.getContext("2d")!;
  if (!ctx) throw new Error("Failed to get context");

  const player = new Player({ x: 0, y: 0 });
  const viewport = new Viewport(ctx, player);
  const music = new Music();
  const game = new Game(viewport, player, music);

  let animationId = 0;
  let lastTime = 0;

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.draw(ctx);

    game.update(deltaTime);

    animationId = requestAnimationFrame(animate);
  }

  cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(animate);

  toggle.addEventListener("click", () => {
    viewport.toggleGameMode();
    toggle.blur();
    const utterance = new SpeechSynthesisUtterance("Kan du laga min skrivare?");
    utterance.lang = 'sv-SE'
    // utterance.pitch = 2
    utterance.rate = 1
    utterance.volume = 0.1
    speechSynthesis.speak(utterance);
  });

  addEventListener("keydown", (event) => {
    if (event.key === "d") viewport.debug = !viewport.debug;
  });
}

init();

declare global {
  const canvas: HTMLCanvasElement;
  const toggle: HTMLButtonElement;
}
