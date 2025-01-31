function onMouseWheel(opt) {
    let delta = opt.e.deltaY;
    opt.e.preventDefault();
    opt.e.stopPropagation();
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > MAX_ZOOM) zoom = MAX_ZOOM;
    if (zoom < MIN_ZOOM) zoom = MIN_ZOOM;

    const mouse = canvas.getPointer(opt.e);
    
    canvas.zoomToPoint({ x: mouse.x, y: mouse.y }, zoom);

    if (zoom === MIN_ZOOM) {
        smoothCenterViewport();
    }
}


function smoothCenterViewport() {
    // console.log('smoothCenterViewport');
    let vpt = canvas.viewportTransform;
    if (!vpt) return;

    let width = canvas.getWidth(),
        height = canvas.getHeight(),
        zoom = canvas.getZoom(),
        zoomWidth = width / zoom,
        zoomHeight = height / zoom,
        offsetX = (width - zoomWidth) / 2,
        offsetY = (height - zoomHeight) / 2;

    let startX = vpt[4],
        startY = vpt[5],
        deltaX = offsetX - startX,
        deltaY = offsetY - startY,
        duration = 150,
        startTime = performance.now();

    function animate(time) {
        let elapsed = time - startTime;
        let progress = Math.min(elapsed / duration, 1);

        vpt[4] = startX + deltaX * progress;
        vpt[5] = startY + deltaY * progress;

        canvas.requestRenderAll();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

    canvas.off('mouse:wheel', onMouseWheel);
    setTimeout(() => {
        canvas.on('mouse:wheel', onMouseWheel);
    }, duration);
}

function onPinch(e) {
    let zoom = lastZoom * e.scale;
    if (zoom > MAX_ZOOM) zoom = MAX_ZOOM;
    if (zoom < MIN_ZOOM) zoom = MIN_ZOOM;

    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    canvas.zoomToPoint(center, zoom);

    if (zoom === MIN_ZOOM) {
        smoothCenterViewport();
    } else {

    }
}


function onPinchEnd() {
    lastZoom = canvas.getZoom();
}