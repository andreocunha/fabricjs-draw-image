// Função para salvar objetos do canvas e dimensões no localStorage
function saveCanvasState() {
    const objects = canvas.getObjects().filter(obj => obj.type !== 'image' && obj !== overlay);
    const objectsState = objects.map(obj => obj.toJSON(['selectable', 'evented', 'shadow']));
    const canvasState = {
        width: canvas.width,
        height: canvas.height,
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
        const currentCanvasWidth = canvas.width;
        const currentCanvasHeight = canvas.height;
        
        const scaleX = currentCanvasWidth / savedCanvasWidth;
        const scaleY = currentCanvasHeight / savedCanvasHeight;
        
        fabric.util.enlivenObjects(canvasState.objects, function (enlivenedObjects) {
            enlivenedObjects.forEach(function (fabricObj) {
                fabricObj.scaleX *= scaleX;
                fabricObj.scaleY *= scaleY;
                fabricObj.left *= scaleX;
                fabricObj.top *= scaleY;
                fabricObj.setCoords();
                canvas.add(fabricObj);
            });
            canvas.renderAll();
            updateClipPath();
            console.log('Estado do canvas carregado com sucesso!');
        });
    }
}