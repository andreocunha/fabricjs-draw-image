function saveCanvasState() {
    const objects = canvas.getObjects().filter(obj => obj.type !== 'image' && obj !== overlay);
    const objectsState = objects.map(obj => obj.toJSON(['selectable', 'evented', 'shadow']));
    const canvasState = {
        width: imageObj.width * imageObj.scaleX,
        height: imageObj.height * imageObj.scaleY,
        objects: objectsState
    };
    localStorage.setItem('canvasState', JSON.stringify(canvasState));
    console.log('Estado do canvas salvo com sucesso!');
}

// Função para carregar objetos do canvas e redimensionar conforme necessário
function loadCanvasState() {
    const canvasStateJSON = localStorage.getItem('canvasState');
    if (canvasStateJSON) {
        const canvasState = JSON.parse(canvasStateJSON);
        const savedCanvasWidth = canvasState.width;
        const savedCanvasHeight = canvasState.height;
        const currentCanvasWidth = imageObj.width * imageObj.scaleX;
        const currentCanvasHeight = imageObj.height * imageObj.scaleY;
        console.log('savedCanvasWidth', savedCanvasWidth);
        console.log('savedCanvasHeight', savedCanvasHeight);
        console.log('currentCanvasWidth', currentCanvasWidth);
        console.log('currentCanvasHeight', currentCanvasHeight);
        
        const scaleX = currentCanvasWidth / savedCanvasWidth;
        const scaleY = currentCanvasHeight / savedCanvasHeight;
        
        fabric.util.enlivenObjects(canvasState.objects, function (enlivenedObjects) {
            enlivenedObjects.forEach(function (fabricObj) {
                fabricObj.scaleX *= scaleX;
                fabricObj.scaleY *= scaleY;
                fabricObj.left = (fabricObj.left - savedCanvasWidth / 2) * scaleX + currentCanvasWidth / 2;
                fabricObj.top = (fabricObj.top - savedCanvasHeight / 2) * scaleY + currentCanvasHeight / 2;
                fabricObj.setCoords();
                canvas.add(fabricObj);
                console.log('left', fabricObj.left);
                console.log('top', fabricObj.top);
            });
            canvas.renderAll();
            // updateClipPath();
            console.log('Estado do canvas carregado com sucesso!');
        });
    }
}
