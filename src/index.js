import 'font-awesome/css/font-awesome.min.css!';
import 'bootstrap/css/bootstrap.min.css!';
import Virality from 'virality';
import Fps from 'components/fps';
import TextWriter from 'components/text-writer';
import Starfield from 'components/starfield';
import HeadQuarter from 'components/headquarter';

Virality.init({ 
	width: 576, 
	height: 1024, 
	background: '#000',
	elementId: 'game-area'
}).start();

Virality.addComponent(new Fps({x: 10, y: 10 }));
Virality.addComponent(new Starfield(0, 0, Virality.viewport.width, Virality.viewport.height, 500));

let buildings = [];

Virality.canvas.onclick = function(evt) {
	var coords = Virality.getBufferCoordinatesFromEvent(evt);

	var hq = new HeadQuarter(`Headquarter ${buildings.length}`, coords.x, coords.y);
	Virality.addComponent(hq);
}


document.getElementById('fullscreen').onclick = function() {
	Virality.fullscreen();
};