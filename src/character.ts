import { Position } from "./position";
import { Viewport } from "./viewport";

export type CharacterMove = -1 | 0 | 1;

export class Character {
  state = CharacterState.idle;
  skin = sample(characterSkins);
  hair = sample(characterHairs);
  facing = sample(characterFacings);
  top = sample(characterTops);
  bottom = sample(characterBottoms);
  shoes = sample(characterShoes);
  frame = { x: 0, timer: 0, interval: 1000 / 8 };
  images: HTMLImageElement[] = [];
  speed = 1;
  xmov: CharacterMove = 0;
  ymov: CharacterMove = 0;
  target?: Position;

  pos: Position;
  accessory?: CharacterAccessory;
  tool?: "keyboard";

  constructor({ x, y }: Position) {
    this.pos = { x, y };
    if (Math.random() < 0.2) this.accessory = CharacterAccessory.tie_red;
    this.loadImages();
  }

  update(deltaTime: number, _viewport: Viewport): void {
    this.updateFrame(deltaTime);
  }

  updateFrame(deltaTime: number, { idleStill }: { idleStill?: boolean } = {}) {
    if (this.frame.timer < this.frame.interval) this.frame.timer += deltaTime;
    else {
      this.frame.timer = 0;
      this.frame.x =
        idleStill && this.state === CharacterState.idle
          ? 0
          : (this.frame.x + 1) % characterFrames[this.state];
    }
  }

  move(deltaTime: number, speed = this.speed) {
    if (this.xmov || this.ymov) {
      const angle = Math.atan2(this.ymov, this.xmov);
      this.state = speed > 0.5 ? CharacterState.run : CharacterState.walk;
      this.facing = updateFacing(this.xmov, this.ymov);
      this.pos.x += Math.cos(angle) * speed * deltaTime * 0.003;
      this.pos.y += Math.sin(angle) * speed * deltaTime * 0.003;
    } else if (this.state !== CharacterState.idle) {
      this.state = CharacterState.idle;
      this.frame.x = 0;
    }
    this.loadImages();
  }

  pointToTarget() {
    if (!this.target) return
    const xd = this.target.x - this.pos.x;
    const yd = this.target.y - this.pos.y;
    const distance = Math.hypot(yd, xd)
    if (distance < 0.5) {
      delete this.target;
      this.xmov = 0;
      this.ymov = 0;
      this.state = CharacterState.idle;
    } else {
      this.xmov = Math.min(xd, (xd >> -1) | 1) as CharacterMove;
      this.ymov = Math.min(yd, (yd >> -1) | 1) as CharacterMove;
    }
  }

  draw(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
    const { tile } = viewport.canvas;
    const pos = viewport.resolve(this.pos);
    const { frame } = this;
    const size = tile * 4;
    const half = size / 2;
    const eight = size / 8;
    for (const image of this.images) {
      if (image.dataset.still) {
        ctx.drawImage(image, pos.x, pos.y, eight, eight);
      } else {
        ctx.drawImage(
          image,
          frame.x * 64,
          this.facing * 64,
          64,
          64,
          pos.x - half,
          pos.y - half,
          size,
          size
        );
      }
    }
  }

  loadImages() {
    getCharacterImages(this).then((images) => {
      this.images = images;
    });
  }

  getSprite() {
    const { x, y } = this.pos;
    const half = 32;
    return {
      min: { x: x - half, y: y - half },
      max: { x: x + half, y: y + half },
    };
  }
}

enum CharacterFacing {
  right,
  left,
  down,
  up,
}

export enum CharacterState {
  idle = "idle",
  jump = "jump",
  run = "run",
  walk = "walk",
}

enum CharacterSkin {
  black = "black",
  caucasian = "caucasian",
  indian = "indian",
}

enum CharacterAccessory {
  tie_red = "tie_red",
}

enum CharacterTop {
  overhalls = "overhalls",
  shirt_green = "shirt_green",
  shirt_white = "shirt_white",
}

const characterTops = [
  CharacterTop.overhalls,
  CharacterTop.shirt_green,
  CharacterTop.shirt_white,
];

enum CharacterBottom {
  jeans = "jeans",
  khakis = "khakis",
}

const characterBottoms = [CharacterBottom.jeans, CharacterBottom.khakis];

enum CharacterShoes {
  black = "black",
  brown = "brown",
  red = "red",
  yellow = "yellow",
}

const characterShoes = [
  CharacterShoes.black,
  CharacterShoes.brown,
  CharacterShoes.red,
  CharacterShoes.yellow,
];

enum CharacterHair {
  balding_gray = "balding_gray",
  bigbun_black = "bigbun_black",
  bigbun_blonde = "bigbun_blonde",
  bigbun_brown_light = "bigbun_brown_light",
  bigbun_brown_dark = "bigbun_brown_dark",
  bigbun_purple = "bigbun_purple",
  bigbun_red = "bigbun_red",
  long_black = "long_black",
  long_blonde = "long_blonde",
  long_brown_dark = "long_brown_dark",
  long_brown_light = "long_brown_light",
  long_purple = "long_purple",
  long_red = "long_red",
  ponytail_black = "ponytail_black",
  ponytail_blonde = "ponytail_blonde",
  ponytail_brown_dark = "ponytail_brown_dark",
  ponytail_brown_light = "ponytail_brown_light",
  ponytail_purple = "ponytail_purple",
  ponytail_red = "ponytail_red",
  short_black = "short_black",
  short_blonde = "short_blonde",
  short_brown_dark = "short_brown_dark",
  short_brown_light = "short_brown_light",
  short_brown_medium = "short_brown_medium",
  short_purple = "short_purple",
  short_red = "short_red",
  small_black = "small_black",
  small_blonde = "small_blonde",
  small_brown_dark = "small_brown_dark",
  small_brown_light = "small_brown_light",
  small_purple = "small_purple",
  small_red = "small_red",
  spikey_black = "spikey_black",
  spikey_blonde = "spikey_blonde",
  spikey_brown_dark = "spikey_brown_dark",
  spikey_brown_light = "spikey_brown_light",
  spikey_purple = "spikey_purple",
  spikey_red = "spikey_red",
}

const cache = new Map<String, Promise<HTMLImageElement>>();

async function getCharacterImages(options: {
  state: CharacterState;
  skin: CharacterSkin;
  hair: CharacterHair;
  top: CharacterTop;
  bottom: CharacterBottom;
  shoes: CharacterShoes;
  accessory?: CharacterAccessory;
  tool?: "keyboard";
}): Promise<HTMLImageElement[]> {
  const { state, skin, hair, top, bottom, shoes, accessory, tool } = options;
  const hairType = hair.split("_")[0];
  async function load(
    path: string,
    options: { still?: boolean } = {}
  ): Promise<HTMLImageElement> {
    let promise = cache.get(path);
    if (promise) return promise;
    promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.src = `${import.meta.env.BASE_URL}assets/${path}`;
      image.onload = () => resolve(image);
      image.onerror = (err) => {
        console.error(options);
        debugger;
        reject(err);
      };
      if (options.still) image.dataset.still = "1";
    });
    cache.set(path, promise);
    return promise;
  }
  const promises: Promise<HTMLImageElement>[] = [
    load(`character/adult/body/${state}/${state}_${skin}_skintone.png`),
    load(
      `character/adult/hairs/${state}/${hairType}/${state}_hairs_${hair}.png`
    ),
    load(
      `character/adult/clothing/${state}/top/${state}_clothing_top_${top}.png`
    ),
    load(
      `character/adult/clothing/${state}/bottom/${state}_clothing_bottom_${bottom}.png`
    ),
    load(
      `character/adult/clothing/${state}/shoes/${state}_clothing_shoes_${shoes}.png`
    ),
  ];
  if (accessory)
    promises.push(
      load(
        `character/adult/clothing/${state}/acessories/${state}_clothing_acessories_${accessory}.png`
      )
    );
  if (tool === "keyboard")
    promises.push(
      load("martin-garrido-cVUPic1cbd4-unsplash.png", { still: true })
    );
  return Promise.all(promises);
}

const characterFrames = {
  idle: 2,
  jump: 6,
  run: 4,
  walk: 6,
};

// const characterStates = [
//   CharacterState.idle,
//   CharacterState.jump,
//   CharacterState.run,
//   CharacterState.walk,
// ];

const characterSkins = [
  CharacterSkin.black,
  CharacterSkin.caucasian,
  CharacterSkin.indian,
];

const characterHairs = [
  CharacterHair.balding_gray,
  CharacterHair.bigbun_black,
  CharacterHair.bigbun_blonde,
  CharacterHair.bigbun_brown_light,
  CharacterHair.bigbun_brown_dark,
  CharacterHair.bigbun_purple,
  CharacterHair.bigbun_red,
  CharacterHair.long_black,
  CharacterHair.long_blonde,
  CharacterHair.long_brown_dark,
  CharacterHair.long_brown_light,
  CharacterHair.long_purple,
  CharacterHair.long_red,
  CharacterHair.ponytail_black,
  CharacterHair.ponytail_blonde,
  CharacterHair.ponytail_brown_dark,
  CharacterHair.ponytail_brown_light,
  CharacterHair.ponytail_purple,
  CharacterHair.ponytail_red,
  CharacterHair.short_black,
  CharacterHair.short_blonde,
  CharacterHair.short_brown_dark,
  CharacterHair.short_brown_light,
  CharacterHair.short_brown_medium,
  CharacterHair.short_purple,
  CharacterHair.short_red,
  CharacterHair.small_black,
  CharacterHair.small_blonde,
  CharacterHair.small_brown_dark,
  CharacterHair.small_brown_light,
  CharacterHair.small_purple,
  CharacterHair.small_red,
  CharacterHair.spikey_black,
  CharacterHair.spikey_blonde,
  CharacterHair.spikey_brown_dark,
  CharacterHair.spikey_brown_light,
  CharacterHair.spikey_purple,
  CharacterHair.spikey_red,
];

const characterFacings = [
  CharacterFacing.right,
  CharacterFacing.left,
  CharacterFacing.down,
  CharacterFacing.up,
];

function updateFacing(xmov: number, ymov: number): CharacterFacing {
  if (xmov === 0) return ymov < 0 ? CharacterFacing.up : CharacterFacing.down;
  return xmov > 0 ? CharacterFacing.right : CharacterFacing.left;
}

function sample<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
