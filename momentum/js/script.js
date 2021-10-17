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
        body.style.backgroundImage = "url(" + "'" + `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg` + "'" + ")";
    }; 

}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
    if(rand == 20) {
        rand = 1;
    } else {
        rand++;
    };
    setBg();
}

function getSlidePrev() {
    if(rand == 1) {
        rand = 20;
    } else {
        rand--;
    };
    setBg();
}

// ------------WEATHER-----------------

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=5e472ae27b533bf0185d2e1e6cf974be&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`
}

city.addEventListener('change', getWeather);

getWeather()

// -------------QUOTES-------------------


changeQuote.addEventListener('click', getQuotes)
// document.addEventListener('DOMContentLoaded', getQuotes);

async function getQuotes() {
    const quotes = 'js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    let randomNum = getRandomNum(0, data.length);
    quote.innerHTML = `${data[randomNum].text}`;
    author.innerHTML = `${data[randomNum].author}`;
  }

getQuotes()

// -------------AUDIO-PLAYER---------------

// jshint maxerr:100

import playList from './playList.js';

const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListUl = document.querySelector('.play-list');
const listItem = document.querySelectorAll('.play-item');

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
        playBtn.classList.toggle('pause')
    } else {
        audio.src = playList[currentSound].src;
        audio.currentTime = 0;
        isPlay = true;
        audio.play();
        playBtn.classList.toggle('pause')
        listItem[currentSound].classList.add('item-active')
    }
}

function playNext() {
    if (isPlay === true) {
        if (currentSound < playList.length - 1) {
            currentSound++
            isPlay = false
            playBtn.classList.toggle('pause')
            listItem[currentSound - 1].classList.remove('item-active')
            playAudio()
        } else {
            currentSound = 0
            isPlay = false
            playBtn.classList.toggle('pause')
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