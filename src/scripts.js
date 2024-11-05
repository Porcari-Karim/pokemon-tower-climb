const playerScript = (entity) => {
    if(isKeyPressed('ArrowRight') || isKeyPressed('KeyD')) entity.directionX++
    else if(isKeyPressed('ArrowLeft') || isKeyPressed('KeyA')) entity.directionX--
    else entity.directionX = 0;

    entity.directionX = Math.min(entity.directionX, MAX_VELOCITY);
    entity.directionX = Math.max(entity.directionX, -MAX_VELOCITY);

    if(isKeyPressed('ArrowUp') || isKeyPressed('KeyW')) entity.directionY--
    else if(isKeyPressed('ArrowDown') || isKeyPressed('KeyS')) entity.directionY++
    else entity.directionY = 0;

    entity.directionY = Math.min(entity.directionY, MAX_VELOCITY);
    entity.directionY = Math.max(entity.directionY, -MAX_VELOCITY);

    if(entity.coordX > entity.parent.offsetWidth) entity.coordX = 0 - entity.element.offsetWidth;
    if(entity.coordX < -entity.element.offsetWidth) entity.coordX = entity.parent.offsetHeight;

    if(entity.coordY > entity.parent.offsetHeight) entity.coordY = 0 - entity.element.offsetHeight;
    if(entity.coordY < -entity.element.offsetHeight) entity.coordY = entity.parent.offsetHeight;
}

const ennemyScript = (entity) => {
    // console.log(entity.coordX, entity.coordY)
    if(entity.coordX <= 0) entity.directionX *= -1;
    if(entity.coordX + entity.element.offsetHeight >= entity.parent.offsetHeight) entity.directionX *= -1;

    if(entity.coordY <= 0) entity.directionY *= -1;
    if(entity.coordY + entity.element.offsetWidth >= entity.parent.offsetWidth) entity.directionY *= -1;
}