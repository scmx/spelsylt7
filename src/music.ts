const tracks = [
  { name: "field_theme_1.wav", length: 80 }, //(((+96 + 87 + 58 },
  { name: "field_theme_2.wav", length: 96 },
  { name: "night_theme_1.wav", length: 87.272721 },
];

// const audioTracks = new Map<string, HTMLAudioElement>();
// for (const name of trackNames) audioTracks.set(name, new Audio());

const audioContext = new AudioContext();
const gainNode = audioContext.createGain();

let source: MediaElementAudioSourceNode;
let audio = new Audio();
audio.loop = true;

export class Music {
  track = tracks[0];

  async play() {
    audio.src = `/music/music.wav`;
    source = audioContext.createMediaElementSource(audio);
    source.connect(gainNode).connect(audioContext.destination);
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
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
