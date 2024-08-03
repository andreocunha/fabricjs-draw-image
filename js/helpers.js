function updateClipPath(event) {
    // console.log('updateClipPath');
    // return;
    if(event && (event.target.type === 'image' || event.target === overlay)) return;
    const objectsCanvas = canvas.getObjects().filter(obj => obj.type !== 'image' && obj !== overlay);

    if (objectsCanvas.length === 0) {
        overlay?.set({
            clipPath: null
        });
        return;
    }

    const allObjectsFormatted = objectsCanvas.map(obj => {
        if (obj.type === 'circle') {
            return new fabric.Circle({
                ...obj,
                fill: 'rgba(255, 255, 255, 1)',
                selectable: true,
                evented: true,
                shadow: null
            });
        } else if (obj.type === 'path') {
            return new fabric.Path(obj.path, {
                ...obj,
                fill: 'rgba(255, 255, 255, 1)',
                selectable: true,
                evented: true,
                shadow: null
            });
        }
    });

    let clipGroup = new fabric.Group([...allObjectsFormatted], {
        inverted: true,
        selectable: false,
        evented: false,
        absolutePositioned: true,
    });

    overlay.set({
        clipPath: clipGroup
    });

    // canvas.requestRenderAll();
}

function onKeyDown(e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    }
}

function addDeleteBtnHandler(eventData, transform) {
    let target = transform.target;
    canvas.remove(target);
    // canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    let size = this.cornerSize / 1.5;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(imgDelete, -size / 2, -size / 2, size, size);
    ctx.restore();
}
