import {default as Virality, ViralityObject} from 'virality';
import TextWriter from 'components/text-writer';

export default class Fps extends ViralityObject {
	constructor(config) {
        super();
		config = config || {};

		this.x = config.x || 0;
		this.y = config.y || 0;

		this._writer = new TextWriter('', this.x, this.y);
	}

	update(elapsed) {
		this._writer.text = `${Virality.fpsCurrent} FPS (${Virality.components.length}) ${Virality.media} (${window.innerWidth})`;
		this._writer.update(elapsed);
	}

	render(context) {
		this._writer.render(context);
	}
}