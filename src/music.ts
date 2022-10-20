const trackNames = [
  "field_theme_1.wav",
  "field_theme_2.wav",
  "night_theme_1.wav",
];

const audioTracks = new Map<string, HTMLAudioElement>();
for (const name of trackNames) audioTracks.set(name, new Audio());

let audioContext = new AudioContext();
let gainNode = audioContext.createGain();

export class Music {
  trackName = trackNames[0];

  play() {
    const audio = audioTracks.get(this.trackName)!;
    if (!audio.src) {
      audio.src = `/music/${this.trackName}`;
      audio.loop = true
    }
    audio.play()

    const track = audioContext.createMediaElementSource(audio);
    track.connect(gainNode).connect(audioContext.destination);
    setTimeout(() => {
      audio.pause()
      this.trackName =
      trackNames[(trackNames.indexOf(this.trackName) + 1) % trackNames.length];
      this.play()
    }, 25000)
  }
}

declare global {
  const music_1: HTMLAudioElement
}
