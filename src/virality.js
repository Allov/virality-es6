class Engine {

    constructor() {
        this._lastUpdate = 0;
        this._elapsedTime = 0;
        this._fpsCount = 0;

        this.fpsCurrent = 0;
        this.pause = false;
        this.components = [];
        this.uiComponents = [];

        this.mouse = {};
        this.media = 'desktop';
    }

    init(config) {
        config = config || {};

        if (!config.elementId) {
            throw 'config.elementId is not set! Virality needs a host element';
        }

        this.viewport = {};
        this.viewport.width = config.width || 240;
        this.viewport.height = config.height || 320;
        this.viewport.background = config.background || '#33F'

        this.canvas = document.createElement('canvas');
        this._buffer = document.createElement('canvas');

        this._context = this.canvas.getContext('2d');
        this._bufferContext = this._buffer.getContext('2d');

        // sets the desired size
        this.canvas.width = this._buffer.width = this.viewport.width;
        this.canvas.height = this._buffer.height = this.viewport.height;

        this._gameArea = document.getElementById(config.elementId);
        this._gameArea.setAttribute('style', 'position: absolute; left: 50%; top: 50%;');
        this._gameArea.appendChild(this.canvas);

        this._resized = true;

        this._breakPoints = {
            phone: 480,
            tablet: 768,
            desktop: 1024
        }

        return this;
    }

    fullscreen() {
        this.canvas.webkitRequestFullScreen();
        this._resize();
    }

    addComponent(component) {
        if (!this._bufferContext) throw 'init() has to be called first.';

        component.init(this._bufferContext);
        this.components.push(component);
    }

    addUiComponent(component) {
        if (!this._bufferContext) throw 'init() has to be called first.';

        component.init(this._bufferContext);
        this.uiComponents.push(component);
    }

    start() {
        var self = this;
        let frame = window.requestAnimationFrame(function handler(time) {
            self._update(time);
            frame = window.requestAnimationFrame(handler);
        });

        this._attachEvents();
        
        self._resize();
        self._updateMedia();

        return this;
    }

    getBufferCoordinatesFromEvent(evt) {
        return this.toBufferCoordinates(Engine.getMousePosition(this.canvas, evt));
    }

    toBufferCoordinates(coords) {
        var ratioX = coords.x / this.canvas.width;
        var ratioY = coords.y / this.canvas.height;

        return {
            x: ratioX * this._buffer.width,
            y: ratioY * this._buffer.height
        };
    }

    createCanvas(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        return canvas;
    }

    _attachEvents() {
        // todo: see if we need to toggle this feature.
        var self = this;
        window.addEventListener('resize', function() {
            self._resize();
            self._updateMedia();
        }, false);

        this.canvas.addEventListener('mousemove', function(evt) {
            self.mouse = self.toBufferCoordinates(Engine.getMousePosition(self.canvas, evt))
        });
    }

    static getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    _update(time) {
        var elapsed = (time - this._lastUpdate);
        this._lastUpdate = time;
        this._elapsedTime += elapsed;

        if (!this.pause) {
            this._updateInner(elapsed);
        }

        this._fpsCount++;

        if (this._elapsedTime >= 1000) {
            this.fpsCurrent = this._fpsCount;
            this._elapsedTime = 0;
            this._fpsCount = 0;
        }
    }

    _updateMedia() {
        if (window.innerWidth < this._breakPoints['phone']) {
            this.media = 'phone';
        } else if (window.innerWidth < this._breakPoints['tablet']) {
            this.media = 'tablet';
        } else {
            this.media = 'desktop';
        }
    }

    _resize() {
        var widthToHeight = this.viewport.width / this.viewport.height;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            this._gameArea.style.height = newHeight + 'px';
            this._gameArea.style.width = newWidth + 'px';
        } else {
            newHeight = newWidth / widthToHeight;
            this._gameArea.style.width = newWidth + 'px';
            this._gameArea.style.height = newHeight + 'px';
        }

        this._gameArea.style.marginTop = (-newHeight / 2) + 'px';
        this._gameArea.style.marginLeft = (-newWidth / 2) + 'px';

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;

        this._resized = true;
    }

    _updateInner(elapsed) {
        this._bufferContext.clearRect(0, 0, this.viewport.width, this.viewport.height);
        this._bufferContext.fillStyle = this.viewport.background;
        this._bufferContext.fillRect(0, 0, this.viewport.width, this.viewport.height);

        if (this._resized) {
            this._resized = false;
            for (let component of this.components) {
                component.resized();
                component.update(elapsed);
                component.render(this._bufferContext);
            }

            for (let component of this.uiComponents) {
                component.resized();
                component.update(elapsed);
                component.render(this._bufferContext);
            }            
        } else {
            for (let component of this.components) {
                component.update(elapsed);
                component.render(this._bufferContext);
            }

            for (let component of this.uiComponents) {
                component.update(elapsed);
                component.render(this._bufferContext);
            }  
        }

        this._context.drawImage(this._buffer, 0, 0, this.canvas.width, this.canvas.height);
    }
}

export default new Engine();

export class ViralityObject {
    init(context) {

    }

    update(elapsed) {

    }

    render(context) {

    }

    resized() {

    }
}

export let FontSizes = {
    phone: {
        XSmall: 3,
        Small: 4,
        Medium: 4.5,
        Large: 5,
        XLarge: 7
    },
    tablet: {
        XSmall: 1.5,
        Small: 2,
        Medium: 2.5,
        Large: 3,
        XLarge: 5
    },
    desktop: {
        XSmall: 1.5,
        Small: 2,
        Medium: 2.5,
        Large: 3,
        XLarge: 5
    },
}