function resizeCanvas() {
    let container = document.getElementById('canvas-container');
    let prevWidth = canvas.width;
    let prevHeight = canvas.height;
    
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    // Calcular a nova largura e altura mantendo a proporção 4:3
    const aspectRatio = 4 / 3;
    let newWidth, newHeight;
    if (containerWidth / aspectRatio <= containerHeight) {
        newWidth = containerWidth;
        newHeight = containerWidth / aspectRatio;
    } else {
        newHeight = containerHeight;
        newWidth = containerHeight * aspectRatio;
    }

    canvas.setWidth(newWidth);
    canvas.setHeight(newHeight);
    canvas.calcOffset();

    let scaleX = newWidth / prevWidth;
    let scaleY = newHeight / prevHeight;

    canvas.getObjects().forEach(obj => {
        // Redimensiona e reposiciona objetos, exceto a imagem de fundo e a sobreposição
        if (obj.type !== 'image' && obj !== overlay) {
            obj.set({
                scaleX: obj.scaleX * scaleX,
                scaleY: obj.scaleY * scaleY,
                left: obj.left * scaleX,
                top: obj.top * scaleY
            });
            obj.setCoords();
        }
    });

    centerAndScaleImage();
    updateClipPath();
    canvas.renderAll();
}

function centerAndScaleImage() {
    if (!imageObj) return;

    let canvasAspect = canvas.width / canvas.height;
    let imgAspect = imageObj.width / imageObj.height;
    let scaleFactor;

    if (canvasAspect >= imgAspect) {
        scaleFactor = canvas.height / imageObj.height;
    } else {
        scaleFactor = canvas.width / imageObj.width;
    }

    imageObj.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        scaleX: scaleFactor,
        scaleY: scaleFactor,
    });

    if (overlay) {
        overlay.set({
            width: canvas.width,
            height: canvas.height
        });
    }
    
    canvas.renderAll();
}