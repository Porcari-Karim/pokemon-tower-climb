const mainFrameElement = document.querySelector('.square');
const startMenuElement = document.querySelector('#start-menu');
const startButtonElement = document.querySelector('#start-button');
const menuButtonElement = document.querySelector('#open-button');
const soundMenuElement = document.querySelector('.sound-menu');
const volumeInputElement = document.querySelector('#volume');

const musicAudioElement = new Audio('assets/audio/Lavender Town_Pokemon_ LetsGo_theme.mp3');
musicAudioElement.volume = 0.01;

volumeInputElement.value = '0.1';
let menuOpened = false;

menuButtonElement.addEventListener('click', () => {
    if(!menuOpened) {
        soundMenuElement.style.animation = 'open-menu 1s forwards ease-in-out';
    } else {
        soundMenuElement.style.animation = 'close-menu 1s forwards ease-in-out';
    }
    menuOpened = !menuOpened;
})

volumeInputElement.addEventListener('input', (e) => {
    // console.log(e.target.value);
    musicAudioElement.volume = e.target.value / 10;
})


const MAX_VELOCITY = 15;

// console.log(filterElement);
// maximizeFilter();



const myGame = new Game(mainFrameElement, filterElement);
// myGame.play();

startButtonElement.addEventListener('click', () =>{
    startMenuElement.remove();
    musicAudioElement.play();
    myGame.play();
})

