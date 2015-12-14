import {
    default as Virality, ViralityObject
}
from 'virality';

class Star extends ViralityObject {
    constructor(x, y, color, size, velocity) {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.velocity = velocity;
    }

    render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
}

export default class Starfield extends ViralityObject {

    constructor(x, y, width, height, starCount) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.starCount = starCount;
        this.stars = [];
    }

    init(context) {
        for (let i = 0; i < this.starCount; i++) {
            var star = new Star(
            		getRandomIntInclusive(0, this.width), 
            		getRandomIntInclusive(0, this.height), 
            		'#AAA', 
            		getRandomIntInclusive(2, 4), 
            		getRandomIntInclusive(1, 50) / 100
            );

            this.stars.push(star);
        }
    }

    update(elapsed) {
        for (let star of this.stars) {
            star.y += star.velocity * elapsed;

            if (star.y > this.height) {
            	star.y = getRandomIntInclusive(-10, 0);
            }
        }
    }

    render(context) {
        //context.drawImage(this._canvas, this.x, this.y);
        for (let star of this.stars) {
            star.render(context);
        }
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
