function toggleAddShape() {
    addShapeMode = !addShapeMode;
    drawingMode = false;
    canvas.isDrawingMode = drawingMode;
    document.getElementById('toggleDrawing').textContent = 'Ativar Desenho Livre';
    this.textContent = addShapeMode ? 'Desativar Adição de Formas' : 'Ativar Adição de Formas';
}

function toggleDrawing() {
    drawingMode = !drawingMode;
    addShapeMode = false;
    canvas.isDrawingMode = drawingMode;
    canvas.freeDrawingBrush.color = 'rgba(0, 255, 255, 1.0)';
    canvas.freeDrawingBrush.width = 2;
    document.getElementById('toggleAddShape').textContent = 'Ativar Adição de Formas';
    this.textContent = drawingMode ? 'Desativar Desenho Livre' : 'Ativar Desenho Livre';
}
