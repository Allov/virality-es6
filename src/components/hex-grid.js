import {
    default as Virality, ViralityObject
}
from 'virality';

import createHexCanvas from 'graphics/hex';

export default class HexGrid extends ViralityObject {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.grid = [];

        this._hexSize = 75;
        this._hexHeight = this._hexSize * 2;
        this._hexWidth = Math.sqrt(3)/2 * this._hexHeight;
    }

    init(context) {
        this._initCanvas();

        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var x = 1 + (hexWidth / 2) + (i * hexWidth) + (j % 2 * (hexWidth / 2));
                var y = 1 + (hexHeight / 2) + j * (0.75 * hexHeight);

                var tile = getTile({
                    x: x + options.x,
                    y: y + options.y
                });

                tile.x = x;
                tile.y = y;
            }
        }
    }

    _initCanvas() {
        var width = this._hexWidth * this.width + (this._hexWidth / 2) + 4;
        var height = this._hexHeight * this.height + (this._hexHeight / 2) + 4;

        this._canvas = Virality.createCanvas(width, height);
    }
}

export class HexTile extends ViralityObject {
    constructor(x, y, size) {
        super();

        this.x = x;
        this.y = y;
        this.size = size || 75;
    }

    init(context) {
        this._hexCanvas = createHexCanvas(this.size, '#E9E75E');
    }

    render(context) {
        context.drawImage(this._hexCanvas, this.x, this.y);
    }
}
