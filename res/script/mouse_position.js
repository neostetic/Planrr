document.body.onmousemove = getCursorPos;
let posX = 0;
let posY = 0;

function getCursorPos(a)
{
    posX = a.clientX;
    posY = a.clientY;
}

canvas.onmousemove = getCanvasPosition;
let canvasPosX = 0;
let canvasPosY = 0;

function getCanvasPosition(a)
{
    canvasPosX = a.clientX - ((document.body.offsetWidth - canvas.offsetWidth) / 2);
    canvasPosY = a.clientY - ((document.body.offsetHeight - canvas.offsetHeight - header.offsetHeight));
    console.log(canvasPosX + " and " + canvasPosY)
}