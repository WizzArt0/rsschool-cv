const popupLink = document.querySelector('.popup-link');
const body = document.querySelector('body')
const popupCloseIcon = document.querySelector('.popup-close')
const settingsPopup = document.querySelector('.settings-popup')

let unlock = true;

popupLink.addEventListener('click', e => {
    settingsPopup.classList.add('open');
    settingsPopup.addEventListener('click', function(e) {
        if(!e.target.closest('.popup-content')) {
            popupClose();
        }
    })
    e.preventDefault();
})
popupCloseIcon.addEventListener('click', e => {
    settingsPopup.classList.remove('open');
    e.preventDefault();
})

