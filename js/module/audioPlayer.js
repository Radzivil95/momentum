"use strict";
const compositions = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];
const playerPlay = document.querySelector('.play');
const playerPrev = document.querySelector('.play-prev');
const playerNext = document.querySelector('.play-next');
const compositionsList = document.querySelector('.play-list');
const audio = document.querySelector('.audio');
const playerControls = document.querySelector('.player-controls');
const renderComposition = document.createElement('div');
renderComposition.classList.add('play-list__item');
renderComposition.classList.add('composition');

const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
const progress = document.createElement('div');
progress.classList.add('progress');
const compositionTime = document.createElement('div');
const compositionTotalTime = document.createElement('div');
const compositionCurrentTime = document.createElement('div');
compositionTime.classList.add('composition__time-wrapper');

compositionsList.before(compositionTime);
compositionTime.append(compositionCurrentTime);
compositionTime.append(compositionTotalTime);
compositionCurrentTime.innerHTML = '0';

const volume = document.createElement('div');
const volumeImg = document.createElement('img');
const volumeValue = document.createElement('div');
const volumeProgress = document.createElement('div');

function renderVolume() {
  volume.classList.add('volume__wrapper');
  volume.append(volumeImg);
  volume.append(volumeValue);
  volumeValue.append(volumeProgress);
  volumeImg.src = '/assets/svg/volume-on.svg';
  volumeImg.classList.add('volume-img');
  volumeValue.classList.add('volume-value');
  volumeProgress.classList.add('volume-progress');
}

let currentComposition = 0;

export function createCompositionList() {
  compositions.forEach(e => {
    const compositionElement = document.createElement('li');
    compositionElement.classList.add('play-list__item');
    compositionElement.classList.add('play-item');
    compositionElement.innerHTML = e;
    compositionsList.append(compositionElement);
    compositionsList.childNodes[0].classList.add('play_active');
  });
}

function setCompotition(composition) {
  audio.src = `/assets/sounds/${composition}.mp3`;
  renderComposition.innerHTML = compositions[currentComposition];
  playerControls.after(renderComposition);
}

setCompotition(compositions[currentComposition]);

function playComposition() {
  audio.play();
  playerPlay.classList.add('pause');
}

function pauseComposition() {
  audio.pause();
  playerPlay.classList.remove('pause');
}

playerPlay.addEventListener('click', () => {
  if(playerPlay.classList.contains('pause')){
    pauseComposition();
  } else {
    playComposition();
  }
});

compositionsList.childNodes.forEach(e => {
  e.addEventListener('click', () => {
    pauseComposition();
    document.querySelector('.play_active')?.classList.remove('play_active');
    e.classList.add('play_active');
    setCompotition(e.innerHTML);
    renderComposition.innerHTML = e.innerHTML;
  });
});


function nextComposition() {
  currentComposition++;
  if(currentComposition > compositions.length-1) {
    currentComposition = 0;
  }
  document.querySelector('.play_active')?.classList.remove('play_active');
  compositionsList.childNodes.forEach(e => {
    if(e.innerHTML == compositions[currentComposition]) {
      e.classList.add('play_active');
    }
  })
  setCompotition(compositions[currentComposition]);
  playComposition();
}

playerNext.addEventListener('click', () => {
  nextComposition();
});

function prevComposition() {
  currentComposition--;
  if(currentComposition < 0) {
    currentComposition = compositions.length-1;
  }
  document.querySelector('.play_active')?.classList.remove('play_active');
  compositionsList.childNodes.forEach(e => {
    if(e.innerHTML == compositions[currentComposition]) {
      e.classList.add('play_active');
    }
  });
  setCompotition(compositions[currentComposition]);
  playComposition();
}

playerPrev.addEventListener('click', () => {
  prevComposition();
});

//progress bar
renderComposition.after(progressBar);
progressBar.append(progress);

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
//set progress
function setProgress(e) {
  const width = this.clientWidth;
  const progressX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (progressX / width) * duration;
}

function showTotalTime(e) {
  const time = e.srcElement.duration;
  let seconds = parseInt(time);
  let minutes = parseInt(seconds/60);
  seconds -= minutes * 60;
  compositionTotalTime.innerHTML = `${minutes}:${seconds}`;
}

function showCurrentTime(e) {
  const currentTime = e.srcElement.currentTime;
  let seconds = parseInt(currentTime);
  let minutes = parseInt(seconds/60);
  seconds -= minutes * 60;
  compositionCurrentTime.innerHTML = `${minutes}:${seconds}`;
}

compositionTime.after(volume);


function setVolume() {
  if(!localStorage.getItem('volume')) {
    volumeProgress.style.width = '25px';
  } else {
    volumeProgress.style.width = `${localStorage.getItem('volume')}px`;
  }
  audio.volume = parseInt(volumeProgress.style.width) / 100;
}

function chengeVolume(e) {
  volumeProgress.style.width = `${e.pageX - 50}%`;
  audio.volume = (e.pageX-50) / 100;
  if(audio.volume == 0) {
    volumeImg.src = '/assets/svg/volume-off.svg';
  } else {
    volumeImg.src = '/assets/svg/volume-on.svg';
  }
}


volumeImg.addEventListener('click', () => {
  if(audio.volume > 0) {
    volumeImg.src = '/assets/svg/volume-off.svg';
    localStorage.setItem('volume', parseInt(volumeProgress.style.width));
    volumeProgress.style.width = '0px';
    audio.volume = 0;
    console.log(audio.volume);
  } else {
    volumeImg.src = '/assets/svg/volume-on.svg';
    setVolume();
  }
});

volumeValue.addEventListener('click', chengeVolume);
renderVolume();
createCompositionList();
//show composition time
audio.addEventListener('timeupdate', showCurrentTime);
audio.addEventListener('durationchange', showTotalTime);
//progressbar
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
//loop
audio.addEventListener('ended', nextComposition);
// volume
setVolume();