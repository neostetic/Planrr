let importButton = document.getElementById('importButton');
let importConfirm = document.getElementById('importConfirm');
let importCancel = document.getElementById('importCancel');
let newFileButton = document.getElementById('newFileButton');
let newFileClose = document.getElementById('newFileClose');
let newFileConfirm = document.getElementById('newFileConfirm');
let canvasWidth = document.getElementById('canvasWidth');
let canvasWidthInput = document.getElementById('canvasWidthInput');
let canvasHeight = document.getElementById('canvasHeight');
let canvasHeightInput = document.getElementById('canvasHeightInput');
let editBlockButton = document.getElementById('editBlockButton');
let editConfirm = document.getElementById('editConfirm');
let exportButton = document.getElementById('exportButton');
let exportConfirm = document.getElementById('exportConfirm');
let exportCopy = document.getElementById('exportCopy');
let exportFile = document.getElementById('exportFile');
let canvas = document.getElementById('canvas');
let canvasParent = document.getElementById('canvas-parent');
let infoBox = document.getElementById('infoBox');
let settings = document.getElementById('settings');
let newfile = document.getElementById('newfile');
let importe = document.getElementById('import');
let exporte = document.getElementById('export');

window.addEventListener('load', async (event) => {
    document.getElementById('loader').style.opacity = '0';
    await sleep(500);
    document.getElementById('loader').style.display = 'none';
});

importButton.onclick = () => {
    document.getElementById('textImport').value = '';
    infoBox.style.display = 'block';
    importe.style.display = 'block';
    exporte.style.display = 'none';
    settings.style.display = 'none';
    newfile.style.display = 'none';
}

importConfirm.onclick = () => {
    canvas.innerHTML = document.getElementById('textImport').value;
    infoBox.style.display = 'none';
    popupShow('Code Imported')
}

importCancel.onclick = () => {
    infoBox.style.display = 'none';
}

editBlockButton.onclick = () => {
    infoBox.style.display = 'block';
    importe.style.display = 'none';
    exporte.style.display = 'none';
    settings.style.display = 'block';
    newfile.style.display = 'none';
    if (selected !== '') {
        rangeWidth.value = sliceLast(document.getElementById(selected + '-textarea').style.width, 2);
        rangeHeight.value = sliceLast(document.getElementById(selected + '-textarea').style.height, 2);
    }
}

editConfirm.onclick = () => {
    infoBox.style.display = 'none';
}

exportButton.onclick = () => {
    infoBox.style.display = 'block';
    importe.style.display = 'none';
    exporte.style.display = 'block';
    settings.style.display = 'none';
    newfile.style.display = 'none';
    document.getElementById('textExport').value = canvas.innerHTML.replace(/<br>/g, '\n');
}

exportConfirm.onclick = () => {
    infoBox.style.display = 'none';
}

exportCopy.onclick = () => {
    copyExport('textExport');
}

exportFile.onclick = () => {
    exportToFile(randomString(23), document.getElementById('canvas-parent').innerHTML.replace(/<br>/g, '\n'));
    popupShow('Downloading')
}

newFileButton.onclick = () => {
    infoBox.style.display = 'block';
    importe.style.display = 'none';
    exporte.style.display = 'none';
    settings.style.display = 'none';
    newfile.style.display = 'block';
}

newFileClose.onclick = () => {
    infoBox.style.display = 'none';
}

canvasWidth.onchange = () => {
    canvasWidthInput.value = canvasWidth.value + 'px';
}

canvasHeight.onchange = () => {
    canvasHeightInput.value = canvasHeight.value + 'px';
}

newFileConfirm.onclick = async () => {
    infoBox.style.display = 'none';
    canvas.innerHTML = '';
    selected = '';
    elementsIds = [];
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loader').style.opacity = 0;
    await sleep(100);
    document.getElementById('loader').style.opacity = 1;
    await sleep(500);
    canvas.style.width = canvasWidthInput.value;
    canvas.style.height = canvasHeightInput.value;
    document.getElementById('loader').style.opacity = 0;
    await sleep(500);
    document.getElementById('loader').style.display = 'none';
    popupShow('New Canvas Created')
}

const copyExport = (elementId) => {
    let copyText = document.getElementById(elementId);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    popupShow('Export Copied');
}

let selected = '';

document.addEventListener('click', function(e) {
    e = e || window.event;
    let target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
    selectSelected(target)
}, false);

document.addEventListener('input', function(e) {
    e = e || window.event;
    let target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
    updateValue(target)
    document.getElementById('textExport').value = canvas.innerHTML;
}, false);

document.addEventListener("keydown", function (event) {
    if (event.key === 'Delete') {
        deleteBlock();
    }
});

let zIndex = 30;

const selectSelected = (target) => {
    if (target.tagName.toLocaleLowerCase() === 'div' && target.className === 'dragger') {
        if (selected !== '') {
            document.getElementById(selected).classList.remove('selected');
        }
        selected = sliceLast(target.id, 8);
        document.getElementById(selected).classList.add('selected');
        document.getElementById(selected).style.zIndex = zIndex + '';
        zIndex++;
        dragElement(document.getElementById(selected));
    }
}

const updateValue = (target) => {
    if (target.tagName.toLocaleLowerCase() === 'textarea' && target.className === 'textarea') {
        document.getElementById(target.id).innerText = document.getElementById(target.id).value;
    }
}

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

const sliceLast = (text, length) => {
    return text = text.substring(0, text.length - length);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let popup = document.getElementById('popup')

const popupShow = async (text) => {
    popup.innerHTML = text;
    popup.style.opacity = 1;
    popup.style.margin = '40px 0';
    await sleep(700);
    popup.style.opacity = 0;
    await sleep(500);
    popup.style.margin = '20px 0';
}