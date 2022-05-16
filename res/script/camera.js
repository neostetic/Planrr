let upCameraButton = document.getElementById('upCameraButton');
let downCameraButton = document.getElementById('downCameraButton');
let leftCameraButton = document.getElementById('leftCameraButton');
let rightCameraButton = document.getElementById('rightCameraButton');
let zoomInButton = document.getElementById('zoomInButton');
let zoomOutButton = document.getElementById('zoomOutButton');
let centerCameraButton = document.getElementById('centerCameraButton');

let yCameraIndex = 0;
let xCameraIndex = 0;
let canvasScale = 1.0;

zoomInButton.onclick = () => {
    canvasScale = canvasScale + 0.1;
    canvas.style.transform = 'translate(-50%, -50%) scale(' + canvasScale + ')';

}
zoomOutButton.onclick = () => {
    if (canvasScale > 0.3) {
        canvasScale = canvasScale - 0.1;
    }
    canvas.style.transform = 'translate(-50%, -50%) scale(' + canvasScale + ')';

}

upCameraButton.onclick = () => {
    yCameraIndex += 10;
    canvas.style.top = (50 + yCameraIndex) + '%';
}

downCameraButton.onclick = () => {
    yCameraIndex -= 10;
    canvas.style.top = (50 + yCameraIndex) + '%';
}

leftCameraButton.onclick = () => {
    xCameraIndex += 10;
    canvas.style.left = (50 + xCameraIndex) + '%';
}

rightCameraButton.onclick = () => {
    xCameraIndex -= 10;
    canvas.style.left = (50 + xCameraIndex) + '%';
}

centerCameraButton.onclick = () => {
    canvasScale = 1.0;
    xCameraIndex = 0;
    yCameraIndex = 0
    canvas.style.top = (50 + yCameraIndex) + '%';
    canvas.style.left = (50 + xCameraIndex) + '%';
    canvas.style.transform = 'translate(-50%, -50%) scale(' + canvasScale + ')';
    popupShow('Centered')
}