
class Game {
    constructor(frame, filter){
        this.frame = frame;
        this.filter = filter;
        this.playing = false;
        this.gameLoop = null;
        this.score = 0;
        this.lost = false;

        this.player = null;
        this.ennemies = [];
        this.stairs = null;

        // this.frame.style.display = 'none';
    }

    spawnEnnemy = () =>  this.ennemies.push(new Ennemy(this.frame, ennemyScript, this.filter, this.player))

    play = () => {
        // this.frame.style.display = 'initial';
        minimizeFilter();
        this.player = new Player(this.frame, playerScript, this.filter);
        this.spawnEnnemy();
        this.stairs = new Stairs(this.filter);
        this.playing = true;
        this.gameLoop = setInterval(() => {
            this.update();
        }, 1000/60)
        window.addEventListener('resize', () => {
            console.log('resized');
            // console.log('')
            if(!this.playing) {
                this.player.updateCoordinates();
                this.stairs.updateCoordinates();
                this.ennemies.forEach(ennemy => ennemy.updateCoordinates());
            }
        })
    }

    update = () => {
        if(this.playing){
            this.player.update()
            this.ennemies.forEach(ennemy => {
                ennemy.update();
                if(checkCircleCollision(this.player, ennemy)) {
                    this.endGame();
                }
            if(checkCircleCollision(this.player, this.stairs)){
                this.stairs.setRandomPosition();
                this.score += 1;
                this.spawnEnnemy();
            } 
            })
        }

        if(isKeyPressed('KeyP') && !this.lost) this.playing = !this.playing;

    }

    endGame = () => {
        this.playing = false;
        this.lost = true;
        maximizeFilter();
        console.log('YOU LOST ! Score: ', this.score);
        this.createEndScreen();
    }
    createEndScreen = () => {
        const endMessageElement = document.createElement('div');
        endMessageElement.classList.add('message');
        endMessageElement.innerText = `You Lost On Floor ${this.score} !`;

        const retryButtonElement = document.createElement('button');
        retryButtonElement.innerText = 'Retry !';
        retryButtonElement.addEventListener('click', () => document.location.reload());

        const alignElement = document.createElement('div');
        alignElement.classList.add('align');
        alignElement.appendChild(endMessageElement);
        alignElement.appendChild(retryButtonElement);
        
        const endContainerElement = document.createElement('div');
        endContainerElement.classList.add('menu');
        endContainerElement.appendChild(alignElement);
        document.querySelector('#root').appendChild(endContainerElement);
    }
}