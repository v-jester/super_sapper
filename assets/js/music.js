const muteMusicButton = document.querySelector('.mute_music');
let isMusicMuted = false;

const music = new Audio(
  '/assets/music/AdhesiveWombat - Organ Freeman (online-audio-converter.com).mp3'
);

music.volume = 0.1
music.play();

muteMusicButton.addEventListener('click', () => {
  if (isMusicMuted) {
    music.play();
    muteMusicButton.innerHTML = '🔈';
  } else {
    music.pause();
    muteMusicButton.innerHTML = '🔊';
  }

  isMusicMuted = !isMusicMuted;
});
