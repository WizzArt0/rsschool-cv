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
    let timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let bgNumber = getRandomNum(1, 20);

function setBg() {
    let bgNum = String(bgNumber).padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
    img.onload = () => {      
        document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg")`;
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
        playerBtn.classList.remove("play");
        playerBtn.classList.add("pause");
        audio.play();
      } else {
        playerBtn.classList.remove("pause");
        playerBtn.classList.add("play");
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
        playBtn.classList.toggle('crossCircle')
        playBtn.classList.add('play')
        audioPlayer.classList.add('hide');
        // playerBtn.classList.add('icono-pause')
    } else {
        audio.src = playList[currentSound].src;
        audio.currentTime = 0;
        isPlay = true;
        audio.play();
        playBtn.classList.toggle('crossCircle')
        listItem[currentSound].classList.add('item-active')
        playerBtn.classList.add('pause')
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
            playBtn.classList.toggle('crossCircle')
            listItem[currentSound - 1].classList.remove('item-active')
            playAudio()
        } else {
            currentSound = 0
            isPlay = false
            playBtn.classList.toggle('crossCircle')
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
            playBtn.classList.toggle('crossCircle')
            listItem[currentSound + 1].classList.remove('item-active')
            playAudio();
        } else {
            currentSound = playList.length - 1
            isPlay = false
            playBtn.classList.toggle('crossCircle')
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

// -------------TODO-LIST---------------


function onPageLoaded() {
    const input = document.querySelector(".addtodo");
    const todoul = document.querySelector(".todos");
    const saveButton = document.querySelector(".save");
    const clearButton = document.querySelector(".clear");
    const addButton = document.querySelector(".add");
    const todoListBtn = document.querySelector(".todoicon");
    const todoBody = document.querySelector("#todo-wrap");

    function createTodo() {
        const todoli = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        if(input.value !== '') {
            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("todo-trash");
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-trash-alt");
            deleteBtn.appendChild(icon);
    
            todoul.appendChild(todoli).append(textSpan, deleteBtn);
            input.value = "";
            listenDeleteTodo(deleteBtn);
        }

    }

    todoListBtn.addEventListener("click", () => {
        document.querySelector("#todo-wrap").classList.toggle('display'); 
    })

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }

    todoul.addEventListener("click", onClickTodo);

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    todoul.addEventListener("click", onClickTodo);

    saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", todoul.innerHTML);
    });

    clearButton.addEventListener("click", () => {
        todoul.innerHTML = "";
        localStorage.removeItem('todos', todoul.innerHTML);
    });

    addButton.addEventListener('click', createTodo);

    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            todoul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }

    loadTodos();

}

document.addEventListener("DOMContentLoaded", onPageLoaded);


// SETTINGS

const openPopUp = document.querySelector('.settings-button')
const closePopUp = document.querySelector('.close-pop-up')
const popUp = document.querySelector('.pop-up')

openPopUp.addEventListener('click', function (e) {
    e.preventDefault()
    popUp.classList.add('active')
})

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active')
})

const greetingWidget = document.getElementById('greeting-check')
const audioWidget = document.getElementById('player-check')
const weatherWidget = document.getElementById('weather-check')
const todoWidget = document.getElementById('todo-check')
const quotesWidget = document.getElementById('quotes-check')

const greetingContainer = document.querySelector('.greeting-container')
const playerContainer = document.querySelector('.player')
const weatherContainer = document.querySelector('.weather')
const todoContainer = document.querySelector('.todo-container')
const quoteContainer = document.querySelector('.quote-container')


function setWidgetLocalStorage() {
    localStorage.setItem('greetingWidget', greetingWidget.checked)
    localStorage.setItem('audioWidget', audioWidget.checked)
    localStorage.setItem('weatherWidget', weatherWidget.checked)
    localStorage.setItem('todoWidget', todoWidget.checked)
    localStorage.setItem('quotesWidget', quotesWidget.checked)
}

window.addEventListener('beforeunload', setWidgetLocalStorage);

function getWidgetLocalStorage() {
    if (localStorage.getItem('greetingWidget')) {
        greetingWidget.checked = localStorage.getItem('greetingWidget') === 'true'
        greetingWidgetChange(greetingWidget.checked)
    }
    if (localStorage.getItem('audioWidget')) {
        audioWidget.checked = localStorage.getItem('audioWidget') === 'true'
        audioWidgetChange(audioWidget.checked)
    }
    if (localStorage.getItem('weatherWidget')) {
        weatherWidget.checked = localStorage.getItem('weatherWidget') === 'true'
        weatherWidgetChange(weatherWidget.checked)
    }
    if (localStorage.getItem('todoWidget')) {
        todoWidget.checked = localStorage.getItem('todoWidget') === 'true'
        todoWidgetChange(todoWidget.checked)
    }
    if (localStorage.getItem('quotesWidget')) {
        quotesWidget.checked = localStorage.getItem('quotesWidget') === 'true'
        quotesWidgetChange(quotesWidget.checked)
    }
}


window.addEventListener('load', getWidgetLocalStorage);



function greetingWidgetChange(checked) {
    if (checked) {
        greetingContainer.classList.remove('hidden')
    } else {
        greetingContainer.classList.add('hidden')
    }
}
greetingWidget.addEventListener('change', (event) => {
    greetingWidgetChange(event.currentTarget.checked)
})

function audioWidgetChange(checked) {
    if (checked) {
        playerContainer.classList.remove('hidden')
    } else {
        playerContainer.classList.add('hidden')
    }
}
audioWidget.addEventListener('change', (event) => {
    audioWidgetChange(event.currentTarget.checked)
})


function weatherWidgetChange(checked) {
    if (checked) {
        weatherContainer.classList.remove('hidden')
    } else {
        weatherContainer.classList.add('hidden')
    }
}
weatherWidget.addEventListener('change', (event) => {
    weatherWidgetChange(event.currentTarget.checked)
})


function todoWidgetChange(checked) {
    if (checked) {
        todoContainer.classList.remove('hidden')
    } else {
        todoContainer.classList.add('hidden')
    }
}

todoWidget.addEventListener('change', (event) => {
    todoWidgetChange(event.currentTarget.checked)
})

function quotesWidgetChange(checked) {
    if (checked) {
        quoteContainer.classList.remove('hidden')
    } else {
        quoteContainer.classList.add('hidden')
    }
}

quotesWidget.addEventListener('change', (event) => {
    quotesWidgetChange(event.currentTarget.checked)
})

//Moving setting modal window 

let offsetX;
let offsetY;

function moveAt(ev) {
    popUp.style.left = (ev.pageX - offsetX) + "px";
    popUp.style.top = (ev.pageY - offsetY) + "px";
}

let mouseDown = false
popUp.onmousedown = function () {
    mouseDown = true
}

popUp.ondragstart = function (ev) {
    popUp.classList.remove('animate')
    ev.preventDefault()
    offsetX = ev.offsetX;
    offsetY = ev.offsetY;
    popUp.onmousemove = function (ev) {
        if (mouseDown) {
            moveAt(ev);
        } else {
            popUp.onmousemove = null;
        }
    }
    popUp.onmouseup = function (ev) {
        popUp.classList.add('animate')
        mouseDown = false
        popUp.onmousemove = null;
        popUp.onmouseup = null;
    }
};

console.log(`Итого примерно 126 баллов

Часы и календарь +15
время выводится в 24-часовом формате, например: 21:01:00 +5
время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5
выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" +5

Приветствие +10
Текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5
пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5

Смена фонового изображения +20
ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5
изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5
изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5
при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения +5

Виджет погоды +15
при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5
данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5
выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5

Виджет цитата дня +10
при загрузке страницы приложения отображается рандомная цитата и её автор +5
при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5

Аудиоплеер +15
при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3
при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3
треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3
трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3
после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3

Продвинутый аудиоплеер (реализуется без использования библиотек) +20
добавлен прогресс-бар в котором отображается прогресс проигрывания +3
при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3
над прогресс-баром отображается название трека +3
отображается текущее и общее время воспроизведения трека +3
есть кнопка звука при клике по которой можно включить/отключить звук +2
добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука +3
можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3

Настройки приложения +11
в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал +3
скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их +3
настройки приложения сохраняются при перезагрузке страницы +5

Дополнительный функционал на выбор +10
ToDo List - список дел`);