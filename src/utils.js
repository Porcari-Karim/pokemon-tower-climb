const getRelativePositionToTarget = (x,y, target) => {
    // found on https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    let rect = target.getBoundingClientRect();
    let relativeX = x - rect.left; //x position within the element.
    let relativeY = y - rect.top;  //y position within the element.
    return [relativeX, relativeY]
}


const getRandomRange = (a, b) => Math.round(Math.random() * (b - a) + a);

const getRandomPositionInsideElement = (element) => {
    const x = getRandomRange(0, element.offsetWidth);
    const y = getRandomRange(0, element.offsetHeight);
    return [x, y];
}

// Basic Math, explanations can be found at : https://www.jeffreythompson.org/collision-detection/circle-circle.php
const checkCircleCollision = (entity1, entity2) => {
    const addedRays = entity1.getRadius() + entity2.getRadius();
    // console.log(addedRays);
    const entity1Center = entity1.getCenter();
    const entity2Center = entity2.getCenter();
    const distanceBetweenEntities = Math.sqrt( ( (entity1Center[0] - entity2Center[0]) **2 ) + ( (entity1Center[1] - entity2Center[1]) **2 ) )
    // console.log(distanceBetweenEntities <  addedRays);
    return distanceBetweenEntities < addedRays;
}