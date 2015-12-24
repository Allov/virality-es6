import {
    default as Virality, ViralityObject
}
from 'virality';

export default class BaseBuilding extends ViralityObject {

    constructor(name, x, y, radius) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = this.height = radius*2;
        this.radius = radius;

        this._scale = 0;
        this._scaleFactor = 0;

        this._lerp = 0;
    }

    update(elapsed) {
        if (this._comeback && this._scale < 1) {
            this._scale = 0;
            this._lerp = 1;
            return;
        } else if (this._scale < 1) {
            this._scaleFactor = 0.05;
        } else if (this._scale > 4) {
            this._scaleFactor = -0.05;
            this._comeback = true;
            this._lerp = 0.02 * elapsed;
        }

        this._scale += this._scaleFactor * elapsed;
    }

    render(context) {
        context.drawImage(this._pelletCanvas, this.x - (this._pelletCanvas.width + this._scale) / 2, this.y - (this._pelletCanvas.width + this._scale) / 2, this._pelletCanvas.width + this._scale, this._pelletCanvas.height + this._scale);

        if (this._comeback) {
            context.globalAlpha = this._lerp;
            context.drawImage(this._iconCanvas, this.x - this._iconCanvas.width / 2, this.y - this._iconCanvas.width / 2);
            context.globalAlpha = 1;
        }
    }
}
