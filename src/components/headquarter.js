import {
    default as Virality, ViralityObject
}
from 'virality';

export default class HeadQuarter extends ViralityObject {

    constructor(name, x, y) {
    	super();
    	this.name = name;
    	this.x = x;
    	this.y = y;

    	this._canvas = document.createElement('canvas');
    	this._context = this._canvas.getContext('2d');
    	this._canvas.width = this._canvas.height = 200;
    }

    init() {
    	var context = this._context;


        context.beginPath();
        context.arc(this._canvas.width / 2, this._canvas.height / 2, 75, 0, 2 * Math.PI);
        context.closePath();

        context.fillStyle = 'rgba(100, 200, 100, 0.5)';
        context.fill();

    	context.strokeStyle = '#3A3';
        context.lineWidth = 3;
        context.stroke();

        context.beginPath();
        context.arc(this._canvas.width / 2, this._canvas.height / 2, 15, 0, 2 * Math.PI);
        context.closePath();

        context.fillStyle = 'rgba(200, 100, 100, 1)'
        context.fill();

    	context.strokeStyle = '#A33';
        context.lineWidth = 3;
        context.stroke();
    }

    render(context) {
    	context.drawImage(this._canvas, this.x - (this._canvas.width / 2), this.y - (this._canvas.height / 2));
    }
}
