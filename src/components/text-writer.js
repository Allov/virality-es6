import {
    default as Virality, FontSizes, ViralityObject
}
from 'virality';

export default class TextWriter extends ViralityObject {
    constructor(text, x, y, config) {
        super();

        config = config || {};

        this.text = this._lastText = text;
        this._render = false;
        this.x = x;
        this.y = y;

        this.color = config.color || '#FFF';
        this.fontName = config.fontName || 'FontAwesome';
        this.size = config.size || 'Medium';
    }

    init(context) {
    	this._canvas = this._createCanvasFromText();
    }

    update(elapsed) {
    	if (this.text != this._lastText) {
    		this._canvas = this._createCanvasFromText();
    		this._lastText = this.text;
    	}
    }

    render(context) {
    	context.drawImage(this._canvas, this.x, this.y);
    }

    resized() {
		this._canvas = this._createCanvasFromText();
    }

    _createCanvasFromText() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        context.font = `${FontSizes[Virality.media][this.size]}em ${this.fontName}`;
        context.textBaseline = 'top';

        var width = context.measureText(this.text).width;
        var height = context.measureText('M').width*2;

        context.canvas.width = width;
        context.canvas.height = height;

        // don't know why, need to reset values when canvas has been resized...
        context.font = `${FontSizes[Virality.media][this.size]}em ${this.fontName}`;
        context.textBaseline = 'top';
        context.fillStyle = this.color;
        context.fillText(this.text, 0, 0);

        return canvas;
    }
}
