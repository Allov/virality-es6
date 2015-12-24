import {
    default as Virality, ViralityObject
}
from 'virality';

import createPelletCanvas from 'graphics/pellet';
import BaseBuilding from 'components/base-building';

export default class HeadQuarter extends BaseBuilding {

    constructor(name, x, y) {
        super(name, x, y, 25);
    }

    init() {
        this._pelletCanvas = createPelletCanvas(this.width, this.height, '#3FEBFF');
        this._iconCanvas = this._createIconCanvas();
    }

    resized() {
        this._pelletCanvas = createPelletCanvas(this.width, this.height, '#3FEBFF');
    }

    _createIconCanvas() {
        var width = this.width + 4, 
            height = this.height + 4;
        var canvas = Virality.createCanvas(width, height);
        var context = canvas.getContext('2d');

        var x = width / 2,
            y = height / 2;

        context.fillRect(x - 8, y - 5, 3, 10);
        context.fillRect(x - 1, y - 5, 2, 10);
        context.fillRect(x + 5, y - 5, 3, 10);
        context.fillRect(x - 9, y + 5, 18, 3);

        context.beginPath();
        context.moveTo(x, y - 12);
        context.lineTo(x - 10, y - 3);
        context.lineTo(x + 10, y - 3);
        context.fill();

        return canvas; 
    }
}
