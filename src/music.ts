const trackNames = [
  "field_theme_1.wav",
  "field_theme_2.wav",
  "night_theme_1.wav",
];

const audioTracks = new Map<string, HTMLAudioElement>();
for (const name of trackNames) audioTracks.set(name, new Audio());

const audioContext = new AudioContext();
const gainNode = audioContext.createGain();

let track: MediaElementAudioSourceNode;
let audio: HTMLAudioElement | undefined;

export class Music {
  trackName = trackNames[0];

  play() {
    audio?.pause();
    audio = audioTracks.get(this.trackName)!;
    if (!audio.src) {
      audio.src = `/music/${this.trackName}`;
      audio.loop = true;
    }
    track?.disconnect();
    track = audioContext.createMediaElementSource(audio);
    track.connect(gainNode).connect(audioContext.destination);

    const audioContextReady = () => {
      audio?.play();

      setTimeout(() => {
        this.trackName =
          trackNames[
          (trackNames.indexOf(this.trackName) + 1) % trackNames.length
          ];
        this.play();
      }, 25000);
    };
    audioContext.resume().then(audioContextReady);
  }
}

declare global {
  const music_1: HTMLAudioElement;
}
