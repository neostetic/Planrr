let createBlockButton = document.getElementById('createBlockButton');
let deleteBlockButton = document.getElementById('deleteBlockButton');
let zoomInButton = document.getElementById('zoomInButton');
let zoomOutButton = document.getElementById('zoomOutButton');
let importButton = document.getElementById('importButton');
let importConfirm = document.getElementById('importConfirm');
let importCancel = document.getElementById('importCancel');
let editBlockButton = document.getElementById('editBlockButton');
let editConfirm = document.getElementById('editConfirm');
let exportButton = document.getElementById('exportButton');
let exportConfirm = document.getElementById('exportConfirm');
let canvas = document.getElementById('canvas');
let infoBox = document.getElementById('infoBox');
let settings = document.getElementById('settings');
let importe = document.getElementById('import');
let exporte = document.getElementById('export');
let changeColor1 = document.getElementById('changeColor1');
let changeColor2 = document.getElementById('changeColor2');
let changeColor3 = document.getElementById('changeColor3');
let changeColor4 = document.getElementById('changeColor4');
let changeColor5 = document.getElementById('changeColor5');
let changeColor6 = document.getElementById('changeColor6');
let changeColor7 = document.getElementById('changeColor7');
let changeColor8 = document.getElementById('changeColor8');
let changeColor9 = document.getElementById('changeColor9');
let changeColor10 = document.getElementById('changeColor10');
let canvasScale = 1.0;
let colors = [
    '#faacac',
    '#fad1ac',
    '#faf6ac',
    '#cffaac',
    '#acfabb',
    '#acfaf2',
    '#acdffa',
    '#acb3fa',
    '#c5acfa',
    '#e7acfa',
    '#faace7',
    '#faacc8'
]

let elementsIds = [];
let selected = '';

createBlockButton.onclick = () => {
    const element = document.createElement("div");
    let elementId;
    do {
        elementId = 'block_' + randomString(64);
    } while (includesArray(elementsIds, elementId));
    element.innerHTML = '<div class="dragger" id="' + elementId + '-dragger"></div><textarea class="textarea" placeholder="Your text"></textarea>'
    element.style.background = randomFromArray(colors);
    element.classList.add('block');
    element.id = elementId;
    elementsIds.push(elementId);
    canvas.appendChild(element);
    dragElement(document.getElementById(elementId));
}

deleteBlockButton.onclick = () => {
    document.getElementById(selected).remove();
    selected = '';
}

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

importButton.onclick = () => {
    document.getElementById('textImport').value = '';
    infoBox.style.display = 'block';
    importe.style.display = 'block';
    exporte.style.display = 'none';
    settings.style.display = 'none';
}

importConfirm.onclick = () => {
    canvas.innerHTML = document.getElementById('textImport').value;
    infoBox.style.display = 'none';
}

importCancel.onclick = () => {
    infoBox.style.display = 'none';
}

editBlockButton.onclick = () => {
    infoBox.style.display = 'block';
    importe.style.display = 'none';
    exporte.style.display = 'none';
    settings.style.display = 'block';
}

editConfirm.onclick = () => {
    infoBox.style.display = 'none';
}

exportButton.onclick = () => {
    infoBox.style.display = 'block';
    importe.style.display = 'none';
    exporte.style.display = 'block';
    settings.style.display = 'none';
    document.getElementById('textExport').value = canvas.innerHTML;
}

exportConfirm.onclick = () => {
    infoBox.style.display = 'none';
}

changeColor1.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[0]; } }
changeColor2.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[1]; } }
changeColor3.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[2]; } }
changeColor4.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[3]; } }
changeColor5.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[4]; } }
changeColor6.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[5]; } }
changeColor7.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[6]; } }
changeColor8.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[7]; } }
changeColor9.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[8]; } }
changeColor10.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[9]; } }

const randomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const randomString = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const includesArray = (array, item) => {
    return array.includes(item);
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + '-dragger')) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + '-dragger').onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.addEventListener('click', function(e) {
    e = e || window.event;
    let target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
    selectSelected(target)
}, false);

const selectSelected = (target) => {
    if (target.tagName.toLocaleLowerCase() === 'div' && target.className === 'dragger') {
        if (selected !== '') {
            document.getElementById(selected).classList.remove('selected');
        }
        selected = sliceLast(target.id, 8);
        document.getElementById(selected).classList.add('selected');
    }
}

const sliceLast = (text, length) => {
    return text = text.substring(0, text.length - length);
}