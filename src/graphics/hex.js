import { default as Virality } from 'virality';

export default function(size, color) {
    var canvas = Virality.createCanvas(size * 2, size * 2);
    var context = canvas.getContext('2d');

    // context.shadowBlur = 5;
    // context.shadowColor = '#000';

    context.beginPath();
    for (var i = 0; i <= 6; i++) {
        var angle = 2 * Math.PI / 6 * (i + 0.5);
        var x_i = size + size * Math.cos(angle);
        var y_i = size + size * Math.sin(angle);
        if (i == 0) {
            context.moveTo(x_i, y_i);
        } else {
            context.lineTo(x_i, y_i);
        }
    }
    context.closePath();
    
    // context.strokeStyle = //tile.selected ? options.selectedColor : options.lineColor;
    // context.lineWidth = tile.selected ? 4 : 2;
    // context.stroke();

    // var gradient = context.createLinearGradient(0, 0, 0, this.size * 2);
    // gradient.addColorStop(0, "#000");
    // gradient.addColorStop(1, "#555");

    context.fillStyle = color;
    context.fill();

    // context.font = "8pt Courier New";
    // context.fillStyle = '#48d';
    // context.textAlign = "center";
    // context.textBaseline = "middle";
    // context.fillText(tile.q + "," + tile.r, tile.x, tile.y);

    // context.imageSmoothingEnabled = true;

    context.shadowBlur = 0;

    return canvas;
}
