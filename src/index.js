import 'font-awesome/css/font-awesome.min.css!';
import 'bootstrap/css/bootstrap.min.css!';
import Virality from 'virality';
import Fps from 'components/fps';
import TextWriter from 'components/text-writer';
import Starfield from 'components/starfield';
import HeadQuarter from 'components/headquarter';
import Warehouse from 'components/warehouse';
import { HexTile } from 'components/hex-grid';
import UiOverlay from 'components/ui-overlay';

Virality.init({
    width: 576,
    height: 1024,
    background: '#FFF',
    elementId: 'game-area'
}).start();

Virality.addUiComponent(new Fps({
    x: 10,
    y: 12
}));
Virality.addUiComponent(new UiOverlay());
//Virality.addComponent(new Starfield(0, 0, Virality.viewport.width, Virality.viewport.height, 500));

Virality.addComponent(new HexTile(150, 150));

let buildings = [];
let currentBuilding = 'hq';

Virality.canvas.onclick = function(evt) {
    var coords = Virality.getBufferCoordinatesFromEvent(evt);

    if (currentBuilding == 'hq') {
        var hq = new HeadQuarter(`Headquarter ${buildings.length}`, coords.x, coords.y);
        Virality.addComponent(hq);
    } else if (currentBuilding == 'warehouse') {
    	var warehouse = new Warehouse(`Warehouse ${buildings.length}`, coords.x, coords.y);
    	Virality.addComponent(warehouse);
    }
}

document.addEventListener('keydown', evt => {
    if (evt.which == 49) {
        currentBuilding = 'hq';
    } else if (evt.which == 50) {
        currentBuilding = 'warehouse';
    }
});

document.getElementById('fullscreen').onclick = function() {
    Virality.fullscreen();
};
