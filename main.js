'use strict'

const headerBurger = document.querySelector('.header_burger');

headerBurger.addEventListener('click', openHeaderMenu);

function openHeaderMenu() {
    document.querySelector('.menu-main').classList.toggle('active');
    headerBurger.classList.toggle('active')
}

console.log('Вёрстка валидная(+10), семантика (около +12), css-стили (+10), адаптив (+10), меню-бургер (+10), есть фото(+10), навыки и языки в виде списка, контакты нет(?), есть нужная информация(+10), есть пример кода(+10), всё на английском(+10)')