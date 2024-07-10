let canvas = new fabric.Canvas('canvas');
let imageObj;
let addShapeMode = false;
let drawingMode = false;
let overlay;

const MAX_ZOOM = 20;
const MIN_ZOOM = 1;

const IMAGE_WALL = './assets/spray.webp';
const ICON_DELETE = './assets/close.png';

let imgDelete = new Image();
imgDelete.src = ICON_DELETE;

document.getElementById('toggleAddShape').onclick = toggleAddShape;
document.getElementById('toggleDrawing').onclick = toggleDrawing;
document.getElementById('saveShapes').onclick = saveCanvasState;
document.addEventListener('keydown', onKeyDown);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

fabric.Image.fromURL(IMAGE_WALL, function (img) {
    imageObj = img;
    centerAndScaleImage();
    img.selectable = false;
    canvas.add(img);
    canvas.sendToBack(img);

    overlay = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
        fill: 'rgba(0, 0, 0, 0.6)',
        selectable: false,
        evented: false
    });

    canvas.add(overlay);
    canvas.renderAll();
    loadCanvasState();
});

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: addDeleteBtnHandler,
    render: renderIcon,
    cornerSize: 24
});

canvas.on('mouse:wheel', onMouseWheel);
canvas.on('mouse:down', onMouseDown);
canvas.on('mouse:move', onMouseMove);
canvas.on('mouse:up', onMouseUp);

canvas.on('object:modified', updateClipPath);
canvas.on('object:removed', updateClipPath);
canvas.on('object:added', updateClipPath);
canvas.on('object:scaling', updateClipPath);
canvas.on('object:moving', updateClipPath);
canvas.on('object:rotating', updateClipPath);
