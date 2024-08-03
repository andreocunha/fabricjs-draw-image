function resizeCanvas() {
    let container = document.getElementById('canvas-container');
    
    // Canvas ocupa todo o dispositivo
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;
    
    canvas.setWidth(containerWidth);
    canvas.setHeight(containerHeight);
    canvas.calcOffset();

    centerAndScaleContent();
    // updateClipPath();
    // console.log('resizeCanvas');
    // canvas.renderAll();
}

function centerAndScaleContent() {
    if (!imageObj) return;

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    
    const aspectRatio = 4 / 3;
    let contentWidth, contentHeight;
    
    if (canvasWidth / aspectRatio <= canvasHeight) {
        contentWidth = canvasWidth;
        contentHeight = canvasWidth / aspectRatio;
    } else {
        contentHeight = canvasHeight;
        contentWidth = canvasHeight * aspectRatio;
    }
    
    let scaleFactorX = contentWidth / imageObj.width;
    let scaleFactorY = contentHeight / imageObj.height;
    let scaleFactor = Math.min(scaleFactorX, scaleFactorY);

    imageObj.set({
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
        scaleX: scaleFactor,
        scaleY: scaleFactor,
    });

    if (overlay) {
        overlay.set({
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            originX: 'center',
            originY: 'center',
            width: imageObj.width * scaleFactor,
            height: imageObj.height * scaleFactor
        });
    }
    // console.log('centerAndScaleContent');
}