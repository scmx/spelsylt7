const tracks = [
  { name: "field_theme_1.wav", length: 80 }, //(((+96 + 87 + 58 },
  { name: "field_theme_2.wav", length: 96 },
  { name: "night_theme_1.wav", length: 87.272721 },
];

// const audioTracks = new Map<string, HTMLAudioElement>();
// for (const name of trackNames) audioTracks.set(name, new Audio());

let audioContext: AudioContext;
let gainNode: GainNode;

let source: MediaElementAudioSourceNode;
let audio = new Audio();
audio.loop = true;
audio.src = `/music/music.wav`;

export class Music {
  track = tracks[0];
  // playing = false;

  // constructor() {
  //   const handleFirstKeypress = (event: KeyboardEvent) => {
  //     // if (event.key !== "w") return;
  //     // if (this.playing) return;
  //     // this.playing = true;
  //     this.play();
  //   };
  //   addEventListener("keypress", handleFirstKeypress, { once: true });
  // }

  play() {
    console.log("play");
    if (!audioContext) {
      audioContext = new AudioContext();
      gainNode = audioContext.createGain();
      source = audioContext.createMediaElementSource(audio);
      source.connect(gainNode).connect(audioContext.destination);
      audio.play();
      return;
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        source = audioContext.createMediaElementSource(audio);
        source.connect(gainNode).connect(audioContext.destination);
        audio.play();
      });
      return;
    }
    source = audioContext.createMediaElementSource(audio);
    source.connect(gainNode).connect(audioContext.destination);
    audio.play();
  }

  // async play() {
  //   audio.src = `/music/${this.track.name}`;
  //   audio.currentTime = 0;

  //   if (!source) {
  //     source = audioContext.createMediaElementSource(audio);
  //     source.connect(gainNode).connect(audioContext.destination);
  //   }

  //   if (audioContext.state === "suspended") {
  //     await audioContext.resume();
  //   }

  //   audio?.play();

  //   setTimeout(() => {
  //     audio?.pause();
  //     this.track = tracks[(tracks.indexOf(this.track) + 1) % tracks.length];
  //     this.play();
  //   }, 5000);
  // }
}

declare global {
  const music_1: HTMLAudioElement;
}
