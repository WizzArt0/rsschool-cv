// jshint maxerr:100

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const name = document.querySelector('.name');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const audioPlayer = document.querySelector('.audio-player');

// ---------TIME------------

function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);
}

function showDate() {
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    date.textContent = new Date().toLocaleDateString('en-US', options);
}

function getTimeOfDay() {
    const hours = new Date().getHours();
    let timesOfDay = ['night', 'morning', 'day', 'evening'];
    // console.log(Math.floor(hours / 6))
    return timesOfDay[Math.floor(hours / 6)];
}

showTime();
// ---------GREETING------------

greeting.textContent = `Good ${getTimeOfDay()}`

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage);

// ---------SLIDER BACKGROUND------------

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let rand = getRandomNum(1, 20);
let bgNum = rand.toString().padStart(2, "0");

function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
    img.onload = () => {      
        document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOf}/${bgNum}.jpg")`;
    }; 
}

document.addEventListener('DOMContentLoaded', setBg);

function getSlideNext() {
    bgNumber++;
    if (bgNumber > 20)
        bgNumber = 1;
    setBg();
}

function getSlidePrev() {
    bgNumber--;
    if (bgNumber < 1)
        bgNumber = 20;
    setBg();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// ------------WEATHER-----------------

const weatherError = document.querySelector('.weather-error')

async function getWeatherOnLoad() {
    getLocalStorage()
    getWeather()
}

async function getWeather() {  
    let cityName = '';
    if (city.value == '' || city == undefined) {
        cityName = 'Минск'
    } else {
        cityName = city.value
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=5e472ae27b533bf0185d2e1e6cf974be&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod == '404') {
        weatherError.innerHTML = `Error! ${data.message} for "${cityName}"`
        weatherIcon.style.display = 'none'
        temperature.textContent = ''
        weatherDescription.textContent = ''
        windSpeed.textContent = ''
        humidity.textContent = ''
    } else {
        weatherError.innerHTML = ''
        weatherIcon.style.display = 'block'
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        windSpeed.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`
    }
}

document.addEventListener('DOMContentLoaded', getWeatherOnLoad)
city.addEventListener('change', getWeather)

// -------------QUOTES-------------------

changeQuote.addEventListener('click', getQuotes);
// document.addEventListener('DOMContentLoaded', getQuotes);

async function getQuotes() {
    const quotes = 'js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    let randomNum = getRandomNum(0, data.length);
    quote.innerHTML = `${data[randomNum].text}`;
    author.innerHTML = `${data[randomNum].author}`;
}

document.addEventListener('DOMContentLoaded', getQuotes);
document.addEventListener('DOMContentLoaded', () => {
    listItem[0].classList.add('item-active')
});

// -------------AUDIO-PLAYER---------------

import playList from './playList.js';

const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListUl = document.querySelector('.play-list');
const listItem = document.querySelectorAll('.play-item');
// const volumeBtn = document.querySelector('.volume-button')


const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".songtime .current").textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 100);

  const playerBtn = audioPlayer.querySelector(".controls .toggle-play");
  playerBtn.addEventListener(
    "click",
    () => {
      if (audio.paused) {
        playerBtn.classList.remove("icono-play");
        playerBtn.classList.add("icono-pause");
        audio.play();
      } else {
        playerBtn.classList.remove("icono-pause");
        playerBtn.classList.add("icono-play");
        audio.pause();
      }
    },
    false
  );

  audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeEl.classList.remove("icono-volumeMedium");
      volumeEl.classList.add("icono-volumeMute");
    } else {
      volumeEl.classList.add("icono-volumeMedium");
      volumeEl.classList.remove("icono-volumeMute");
    }
  });
  
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
  

const songDuration = document.querySelector(".length");
const songName = document.querySelector(".songname");

let isPlay = false;



for (let i = 0; i < playListUl.children.length; i++) {
    playListUl.children[i].innerHTML = `${playList[i].title}`;
}

const audio = new Audio();
let currentSound = 0;

function playAudio() {
    if (isPlay === true) {
        audio.pause()
        isPlay = false
        playBtn.classList.toggle('icono-crossCircle')
        playBtn.classList.add('play')
        audioPlayer.classList.add('hide');
        playerBtn.classList.add('icono-pause')
    } else {
        audio.src = playList[currentSound].src;
        audio.currentTime = 0;
        isPlay = true;
        audio.play();
        playBtn.classList.toggle('icono-crossCircle')
        listItem[currentSound].classList.add('item-active')
        playerBtn.classList.remove('icono-play')
        audioPlayer.classList.remove('hide')
        playBtn.classList.remove('play')
    }
    songDuration.textContent = ` ${playList[currentSound].duration}`;
    songName.textContent = `${playList[currentSound].title}`
}

function playNext() {
    if (isPlay === true) {
        if (currentSound < playList.length - 1) {
            currentSound++
            isPlay = false
            playBtn.classList.toggle('icono-crossCircle')
            listItem[currentSound - 1].classList.remove('item-active')
            playAudio()
        } else {
            currentSound = 0
            isPlay = false
            playBtn.classList.toggle('icono-crossCircle')
            listItem[listItem.length - 1].classList.remove('item-active')
            playAudio()
        }
    }
    else
    {
        if (currentSound < playList.length - 1) {
            currentSound++
            listItem[currentSound].classList.add('item-active')
            listItem[currentSound - 1].classList.remove('item-active')
            playAudio()
        } else {
            currentSound = 0
            listItem[currentSound].classList.add('item-active')
            listItem[listItem.length - 1].classList.remove('item-active')
            playAudio()
        }
    }
}

function playPrev() {
    if (isPlay === true) {
        if (currentSound > 0) {
            currentSound--
            isPlay = false
            playBtn.classList.toggle('pause')
            listItem[currentSound + 1].classList.remove('item-active')
            playAudio();
        } else {
            currentSound = playList.length - 1
            isPlay = false
            playBtn.classList.toggle('pause')
            listItem[0].classList.remove('item-active')
            playAudio();
        }
    }
    else
    {
        if (currentSound > 0) {
            currentSound--
            listItem[currentSound].classList.add('item-active')
            listItem[currentSound + 1].classList.remove('item-active')
            playAudio();
        } else {
            currentSound = playList.length - 1
            listItem[currentSound].classList.add('item-active')
            listItem[0].classList.remove('item-active')
            playAudio();
        }
    }
}

playBtn.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);


