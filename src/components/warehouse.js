import {
    default as Virality, ViralityObject
}
from 'virality';

import createPelletCanvas from 'graphics/pellet';
import BaseBuilding from 'components/base-building';

export default class HeadQuarter extends BaseBuilding {

    constructor(name, x, y) {
        super(name, x, y, 15);
    }

    init() {
        this._pelletCanvas = createPelletCanvas(this.width, this.height, '#A4EA60');
        this._iconCanvas = this._createIconCanvas();
    }

    resized() {
        this._pelletCanvas = createPelletCanvas(this.width, this.height, '#A4EA60');
    }

    _createIconCanvas() {
        var width = this.width + 4, 
            height = this.height + 4;
        var canvas = Virality.createCanvas(width, height);
        var context = canvas.getContext('2d');

        var x = width / 2 - 5,
            y = height / 2 - 5;

        context.fillRect(x, y, 10, 10);

        return canvas; 
    }
}
