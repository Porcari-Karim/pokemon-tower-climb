const filterElement = document.querySelector('.filter');
const keys = new Map();
const mouse = {
    x: 0,
    y: 0,
}
// const maskSize = mainFrameElement.offsetWidth * 0.15;
let maximized = false;

const isKeyPressed = (keyCode) => keys.has(keyCode) ? keys.get(keyCode) : false;

document.addEventListener('keydown', (e) => {
    keys.set(e.code, true);
    // console.log(e.code)
    if(e.code === 'ArrowDown' || e.code === 'ArrowUp') e.preventDefault();
    if(e.code === 'KeyF') maximized ? minimizeFilter() : maximizeFilter();
})

const maximizeFilter = () => {
    maximized = true;
    filterElement.style.animation = 'maximize-filter 0.5s linear 1';
    setTimeout(() => filterElement.style.maskPosition = 'center', 400);
    filterElement.style.maskSize = '400%';
}

const minimizeFilter = () => {
    maximized = false;
    positionMaskOnMouse();
    filterElement.style.animation = 'minimize-filter 0.5s linear 1';
    filterElement.style.maskSize = '20%';
}


document.addEventListener('keyup', (e) => {
    keys.set(e.code, false);
})


const positionMaskOnMouse = (e) => {
    if(!maximized){
        const maskSize = mainFrameElement.offsetWidth * 0.20;
        filterElement.style.maskPosition = `${mouse.x - maskSize/2}px ${mouse.y - maskSize/2}px`;
    }
}

document.addEventListener('mousemove', (e) => {
    // console.log(e);
   if(e.target === filterElement) {
    const [x, y] = getRelativePositionToTarget(e.clientX, e.clientY, e.target);
    mouse.x = x;
    mouse.y = y;
    positionMaskOnMouse();
   }
})