function onMouseDown(opt) {
    if (!opt.e) return;

    if (addShapeMode) {
        let pointer = canvas.getPointer(opt.e);
        let circle = new fabric.Circle({
            radius: 20,
            fill: 'rgba(255, 255, 255, 0)', // Transparente
            stroke: 'rgba(0, 255, 255, 1.0)', // Contorno neon
            strokeWidth: 2,
            left: pointer.x,
            top: pointer.y,
            originX: 'center',
            originY: 'center',
            shadow: new fabric.Shadow({
                color: 'rgba(0, 255, 255, 1)',
                blur: 30
            })
        });
        canvas.add(circle);

    } else if (!drawingMode) {
        let activeObject = canvas.getActiveObject();
        if (!activeObject) {
            this.isDragging = true;
            this.lastPosX = opt.e.clientX || opt.e.touches[0].clientX;
            this.lastPosY = opt.e.clientY || opt.e.touches[0].clientY;
            canvas.selection = false;
        }
    }
}

function onMouseMove(opt) {
    if (this.isDragging) {
        let e = opt.e;
        let vpt = this.viewportTransform;
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        vpt[4] += clientX - this.lastPosX;
        vpt[5] += clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = clientX;
        this.lastPosY = clientY;
    }
}

function onMouseUp(opt) {
    this.isDragging = false;
    canvas.selection = true;
    if (canvas.getZoom() === MIN_ZOOM) {
        smoothCenterViewport();
    }
    if (drawingMode) {
        finalizeDrawing();
    }
}

function finalizeDrawing() {
    canvas.isDrawingMode = false;
    let objects = canvas.getObjects('path');
    if (objects.length > 0) {
        let lastPath = objects[objects.length - 1];
        let path = new fabric.Path(lastPath.path, {
            fill: 'rgba(255, 255, 255, 0)', // Transparente
            stroke: 'rgba(0, 255, 255, 1.0)', // Contorno neon
            strokeWidth: 2,
            selectable: true,
            shadow: new fabric.Shadow({
                color: 'rgba(0, 255, 255, 1)',
                blur: 30
            })
        });
        canvas.remove(lastPath);
        canvas.add(path);
        canvas.renderAll();
    }
    canvas.isDrawingMode = true;
    updateClipPath();
}
