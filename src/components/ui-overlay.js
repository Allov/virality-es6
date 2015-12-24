import {
    default as Virality, ViralityObject
}
from 'virality';

export default class UiOverlay extends ViralityObject {

	constructor() {
		super();
	}

	init() {
		this._canvas = Virality.createCanvas(Virality.viewport.width, Virality.viewport.height);
		var context = this._canvas.getContext('2d');

		context.fillStyle = '#000';
		context.fillRect(0, 0, 5, this._canvas.height);
		context.fillRect(this._canvas.width - 5, 0, 5, this._canvas.height);
	}

	render(context) {
		context.drawImage(this._canvas, 0, 0);
	}
}