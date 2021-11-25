const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body')
const popupCloseIcon = document.querySelector('.popup-close')
const settingsPopup = document.querySelector('.settings-popup')

if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", e => {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            openPopup(currentPopup);
            e.preventDefault();
        })
    }
}

popupCloseIcon.addEventListener('click', popupClose)

function openPopup() {
    settingsPopup.classList.add('open');
    settingsPopup.addEventListener('click', function(e) {
        if(!e.target.closest('.popup-content')) {
            popupClose();
        }
    })
} 

function popupClose(e) {
    settingsPopup.classList.remove('open');
    e.preventDefault();
}