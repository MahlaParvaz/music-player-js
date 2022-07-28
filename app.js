import { songs } from "/music.js";
const playBtn = document.querySelector(".play-btn");
const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");
const repeat = document.querySelector(".fa-repeat");
const randomPlay = document.querySelector(".fa-shuffle");
const likeBtn = document.querySelector(".fa-heart");
const music = document.querySelector("#audio");
// const image = document.querySelector(".poster");
const musicName = document.querySelector(".music-name");
const artistName = document.querySelector(".music-artist");
// const music = document.createElement("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const wave = document.querySelector(".wave");
const musicArt = document.querySelector(".music__img");
const volume = document.querySelector(".fa-volume-high");
// check if play
let isPlaying =
  music.currentTime > 0 &&
  !music.paused &&
  !music.ended &&
  music.readyState > music.HAVE_CURRENT_DATA;
let songIndex = 0;
let isRandom = false;

// play
function playPause() {
  if (isPlaying) {
    music.play();
    isPlaying = false;
    wave.classList.add("loader");
    musicArt.classList.add("rotate");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    music.pause();
    isPlaying = true;
    wave.classList.remove("loader");
    musicArt.classList.remove("rotate");
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
}
// load DOM
function loadMusic() {
  musicArt.style.backgroundImage = "url(" + songs[songIndex].img + ")";
  music.src = songs[songIndex].path;
  // image.src = songs[songIndex].img;
  musicName.textContent = songs[songIndex].name;
  artistName.textContent = songs[songIndex].singer;
  isPlaying = true;
  playPause();
}
loadMusic(songIndex);
// next music
function nextMusic() {
  if (songIndex < songs.length - 1 && isRandom === false) {
    songIndex++;
  } else if (songIndex < songs.length - 1 && isRandom === true) {
    let randIndex = Number.parseInt(Math.random() * songs.length);
    songIndex = randIndex;
  } else {
    songIndex = 0;
  }

  loadMusic(songIndex);
}
// pre music
function prevMusic() {
  if (songIndex > 0) {
    songIndex--;
  } else {
    songIndex = songs.length - 1;
  }
  loadMusic(songIndex);
}
// Change Volume

function changeVolume() {
  if (music.muted) {
    music.muted = false;
    volume.classList.add("fa-volume-high");
    volume.classList.remove("fa-volume-off");
  } else {
    music.muted = true;
    volume.classList.remove("fa-volume-high");
    volume.classList.add("fa-volume-off");
  }
}
// update progressbar
function updateProgressBar() {
  const currentTime = music.currentTime;
  const duration = music.duration;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime - currentMin * 60);
  let durationMin = Math.floor(duration / 60) || "--";
  let durationSec = Math.floor(duration - durationMin * 60) || "--";

  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  } else if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  } else if (durationMin < 10) {
    durationMin = `0${durationMin}`;
  } else if (durationSec < 10) {
    durationSec = `0${durationSec}`;
  }
  currentTimeEl.textContent = `${currentMin}:${currentSec}`;
  durationEl.textContent = `${durationMin}:${durationSec}`;
}
//set progressbar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}
// like music
function likeMusic() {
  if (likeBtn.classList.contains("liked")) {
    likeBtn.classList.remove("liked");
  } else {
    likeBtn.classList.add("liked");
  }
  if (loadMusic) {
    nextBtn.addEventListener("click", () => {
      if (likeBtn.classList.contains("liked")) {
        likeBtn.classList.remove("liked");
      }
    });
  }
  if (loadMusic) {
    preBtn.addEventListener("click", () => {
      if (likeBtn.classList.contains("liked")) {
        likeBtn.classList.remove("liked");
      }
    });
  }
}
// repeat music
function repeatMusic() {
  if (repeat.classList.contains("click")) {
    repeat.classList.remove("click");
  } else {
    repeat.classList.add("click");
  }
  if (loadMusic) {
    nextBtn.addEventListener("click", () => {
      if (repeat.classList.contains("click")) {
        repeat.classList.remove("click");
      }
    });
  }
  if (loadMusic) {
    preBtn.addEventListener("click", () => {
      if (repeat.classList.contains("click")) {
        repeat.classList.remove("click");
      }
    });
  }
  // const currentIndex = songIndex;
  loadMusic(songIndex);
  // playPause();
}
// random play
function rand() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomPlay.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomPlay.classList.remove("randomActive");
}

//   add event listeners
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextMusic);
preBtn.addEventListener("click", prevMusic);
likeBtn.addEventListener("click", likeMusic);
repeat.addEventListener("click", repeatMusic);
randomPlay.addEventListener("click", rand);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextMusic);
progressContainer.addEventListener("click", setProgressBar);
volume.addEventListener("click", changeVolume);
