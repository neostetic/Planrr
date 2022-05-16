let createBlockButton = document.getElementById('createBlockButton');
let deleteBlockButton = document.getElementById('deleteBlockButton');
let upBlockButton = document.getElementById('upBlockButton');
let downBlockButton = document.getElementById('downBlockButton');
let leftBlockButton = document.getElementById('leftBlockButton');
let rightBlockButton = document.getElementById('rightBlockButton');
let rangeWidth = document.getElementById('rangeWidth');
let rangeHeight = document.getElementById('rangeHeight');

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

let elementsIds = [];
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

createBlockButton.onclick = () => {
    const element = document.createElement("div");
    let elementId;
    do {
        elementId = 'block_' + randomString(64);
    } while (includesArray(elementsIds, elementId));
    element.innerHTML = '<div class="dragger" id="' + elementId + '-dragger"></div><textarea class="textarea" style="width: 200px; height: 120px;" id="' + elementId + '-textarea" placeholder="Your text"></textarea>'
    element.style.background = randomFromArray(colors);
    element.classList.add('block');
    element.id = elementId;
    elementsIds.push(elementId);
    canvas.appendChild(element);
    dragElement(document.getElementById(elementId));
    popupShow('Block Created')
}

deleteBlockButton.onclick = () => {
    document.getElementById(selected).remove();
    selected = '';
}

let yBlockIndex = 50;
let xBlockIndex = 50;

upBlockButton.onclick = () => {
    if (selected !== '') {
        let top = sliceLast(document.getElementById(selected).style.top, 2)
        document.getElementById(selected).style.top = (top*1 - yBlockIndex*1) + 'px';
    }
}

downBlockButton.onclick = () => {
    if (selected !== '') {
        let top = sliceLast(document.getElementById(selected).style.top, 2)
        document.getElementById(selected).style.top = (top*1 + yBlockIndex*1) + 'px';
    }
}

leftBlockButton.onclick = () => {
    if (selected !== '') {
        let left = sliceLast(document.getElementById(selected).style.left, 2)
        document.getElementById(selected).style.left = (left*1 - xBlockIndex*1) + 'px';
    }
}

rightBlockButton.onclick = () => {
    if (selected !== '') {
        let left = sliceLast(document.getElementById(selected).style.left, 2)
        document.getElementById(selected).style.left = (left*1 + xBlockIndex*1) + 'px';
    }
}

rangeWidth.onmousemove = () => {
    if (selected !== '') {
        document.getElementById(selected + '-textarea').style.width = rangeWidth.value + 'px';
    }
}

rangeHeight.onmousemove = () => {
    if (selected !== '') {
        document.getElementById(selected + '-textarea').style.height = rangeHeight.value + 'px';
    }
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

changeColor1.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[0]; popupShow('Changed color'); } }
changeColor2.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[1]; popupShow('Changed color'); } }
changeColor3.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[2]; popupShow('Changed color'); } }
changeColor4.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[3]; popupShow('Changed color'); } }
changeColor5.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[4]; popupShow('Changed color'); } }
changeColor6.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[5]; popupShow('Changed color'); } }
changeColor7.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[6]; popupShow('Changed color'); } }
changeColor8.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[7]; popupShow('Changed color'); } }
changeColor9.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[8]; popupShow('Changed color'); } }
changeColor10.onclick = () => { if (selected !== '') { document.getElementById(selected).style.backgroundColor = colors[9]; popupShow('Changed color'); } }
