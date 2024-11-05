class Entity {
    constructor(coordX, coordY, parent, callbackFun){
        this.coordX = coordX;
        this.coordY = coordY;
        this.directionX = 0;
        this.directionY = 0;
        this.boundToParent = true;
        this.element = document.createElement('div')
        // this.element.style.position = 'relative';
        this.element.style.width = `${parent.offsetWidth * 0.1}px`;
        this.parent = parent;
        this.callbackFun = callbackFun;
        this.updateCoordinates();
        
    }

    updateCoordinates = () => {
        this.element.style.top = `${this.coordY}px`;
        this.element.style.left = `${this.coordX}px`;
    }

    move = () => {
        this.coordX += this.directionX;
        this.coordY += this.directionY;
        if(this.boundToParent){
            this.coordX = Math.min(this.coordX, this.parent.offsetWidth - this.element.offsetWidth)
            this.coordX = Math.max(this.coordX, 0);
            this.coordY = Math.min(this.coordY, this.parent.offsetHeight - this.element.offsetHeight)
            this.coordY = Math.max(this.coordY, 0);
        }
    }

    update = () => {
        this.updateCoordinates();
        this.move();
        if(this.callbackFun) this.callbackFun(this);
    }

    getCenter = () => {
        const width = this.element.offsetWidth;
        const height = this.element.offsetHeight;
        const elemenRect = this.element.getBoundingClientRect();
        const x = elemenRect.left + width / 2;
        const y = elemenRect.top + height / 2;
        return [x, y];
    }

    destroyDOMElement = () => this.element.remove();

}

class Player extends Entity {
    constructor(parent, callbackFun, maskElement){
        super(0, 0,parent, callbackFun);
        this.parent.insertBefore(this.element, maskElement);;
        const pos = (parent.offsetWidth / 2 - parent.offsetWidth * 0.05); // Centering the Player
        this.coordX = pos;
        this.coordY = pos;
        this.mask = maskElement;
        this.boundToParent = true;
        this.element.classList.add('ball');
        this.element.classList.add('player');
        this.updateCoordinates();
    }

    updateCoordinates = () => {
        // const [relativeX, relativeY] = getRelativePositionToTarget(this.coordX, this.coordY, this.mask);
        const parentRect = this.parent.getBoundingClientRect();
        this.element.style.top = `${parentRect.top + this.coordY}px`;
        this.element.style.left = `${parentRect.left + this.coordX}px`;
    }

    getRadius =  () => this.element.offsetWidth/2;
}


class Ennemy extends Entity {
    constructor(parent, callbackFun, maskElement, player){
        super(0, 0, parent, callbackFun);
        this.mask = maskElement;
        this.boundToParent = true;
        this.element.classList.add('ball');
        this.element.classList.add('ennemy');
        
        const [xPos, yPos] = getRandomPositionInsideElement(maskElement);
        this.coordX = xPos;
        this.coordY = yPos;
        this.updateCoordinates();
        this.setRandomDirection();
        this.parent.insertBefore(this.element, maskElement);

        // Make sure the ennemy doesn't spawn on top of the player;
        while(checkCircleCollision(this, player)){
            const [xPos, yPos] = getRandomPositionInsideElement(maskElement);
            this.coordX = xPos;
            this.coordY = yPos;
            this.updateCoordinates();
            this.setRandomDirection();
        }
    }

    updateCoordinates = () => {
        // const [relativeX, relativeY] = getRelativePositionToTarget(this.coordX, this.coordY, this.mask);
        const parentRect = this.parent.getBoundingClientRect();
        this.element.style.top = `${parentRect.top + this.coordX}px`;
        this.element.style.left = `${parentRect.left + this.coordY}px`;
    }


    getRadius =  () => this.element.offsetWidth/2;

    setRandomDirection = () => {
        // console.log(getRandomRange(5, 10));
        Math.random() < 0.5 ? this.directionX = -getRandomRange(1, 5) : this.directionX = getRandomRange(1, 5);
        Math.random() < 0.5 ? this.directionY = -getRandomRange(1, 5) : this.directionY = getRandomRange(1, 5);
    }

}


class Stairs extends Entity {
    constructor(parent){
        super(0, 0, parent, null);
        this.boundToParent = true;
        this.element.classList.add('stairs');
        
        const [xPos, yPos] = getRandomPositionInsideElement(parent);
        this.coordX = xPos;
        this.coordY = yPos;
        this.parent.appendChild(this.element);
        this.move()
        this.updateCoordinates();
    }

    getRadius =  () => this.element.offsetWidth/2;

    setRandomPosition = () => {
        const [xPos, yPos] = getRandomPositionInsideElement(this.parent);
        // console.log(xPos, yPos)
        this.coordX = xPos;
        this.coordY = yPos;
        this.move();
        this.updateCoordinates();
    }

    hide = () => this.element.style.visibility = 'hidden';
    show = () => this.element.style.visibility = 'visible';
}