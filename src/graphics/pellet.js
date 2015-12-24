import { default as Virality } from 'virality';

export default function(width, height, color) {
    var radius = width;

    width += 10;
    height += 10;

    // if (Virality.media == 'phone') {
    //     width *= 2;
    //     height *= 2;
    //     radius *= 2;
    // }
    var canvas = Virality.createCanvas(width, height);
    var context = canvas.getContext('2d');

    context.shadowBlur = 3;
    context.shadowColor = '#000';

    context.beginPath();
    context.arc(width / 2, height / 2, radius / 2, 0, 2 * Math.PI);
    context.closePath();

    context.fillStyle = color;
    context.fill();

    return canvas;
}
