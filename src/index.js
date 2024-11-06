const mainFrameElement = document.querySelector('.square');
const startMenuElement = document.querySelector('#start-menu');
const startButtonElement = document.querySelector('#start-button');

const MAX_VELOCITY = 15;

console.log(filterElement);
maximizeFilter();

const myGame = new Game(mainFrameElement, filterElement);
// myGame.play();

startButtonElement.addEventListener('click', () =>{
    startMenuElement.remove();
    myGame.play();
})

