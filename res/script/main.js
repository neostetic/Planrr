let importButton = document.getElementById('importButton');
let importConfirm = document.getElementById('importConfirm');
let importCancel = document.getElementById('importCancel');
let newFileButton = document.getElementById('newFileButton');
let newFileClose = document.getElementById('newFileClose');
let newFileConfirm = document.getElementById('newFileConfirm');
let canvasPreset1 = document.getElementById('canvasPreset1');
let canvasPreset2 = document.getElementById('canvasPreset2');
let canvasPreset3 = document.getElementById('canvasPreset3');
let canvasPreset4 = document.getElementById('canvasPreset4');
let canvasPreset5 = document.getElementById('canvasPreset5');
let canvasPreset6 = document.getElementById('canvasPreset6');
let canvasPreset7 = document.getElementById('canvasPreset7');
let canvasPreset8 = document.getElementById('canvasPreset8');
let canvasPresetSwitch = document.getElementById('canvasPresetSwitch');
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

console.log(btoa("xd"));

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
    let importTransform = atob(document.getElementById('textImport').value)
    let regex = /<!--(.*?)-->/g;
    let match = regex.exec(importTransform);
    let importConfig = match ? match[1].trim() : '';
    let canvasInnerHTML = importTransform.replace(regex, '').replace(/^\s+/, '');

    console.log(importConfig)

    let configs = importConfig.split(';');
    let result = {};
    for (let i = 0; i < configs.length; i++) {
        let config = configs[i].trim();
        let parts = config.split(':');
        let confName = parts[0].trim();
        let values = parts[1].trim().split(',');
        result[confName] = values;
    }

    for (let configName in result) {
        if (configName === "canvas-size") {
            canvas.style.width = result[configName][0] + "px"
            canvas.style.height = result[configName][1] + "px"
        }
    }
    canvas.innerHTML = canvasInnerHTML;
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
    document.getElementById('textExport').value = btoa(""
        + "<!--"
        + "canvas-size:"+ canvas.offsetWidth + "," + canvas.offsetHeight
        + "-->"
        + canvas.innerHTML.replace(/<br>/g, '\n'));
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

canvasPreset1.onclick = () => { canvasWidthInput.value = '1920px'; canvasHeightInput.value = '1440px'; changeValue(); }
canvasPreset2.onclick = () => { canvasWidthInput.value = '1600px'; canvasHeightInput.value = '1200px'; changeValue(); }
canvasPreset3.onclick = () => { canvasWidthInput.value = '1280px'; canvasHeightInput.value = '960px'; changeValue(); }
canvasPreset4.onclick = () => { canvasWidthInput.value = '1000px'; canvasHeightInput.value = '1000px'; changeValue(); }
canvasPreset5.onclick = () => { canvasWidthInput.value = '500px'; canvasHeightInput.value = '500px'; changeValue(); }
canvasPreset6.onclick = () => { canvasWidthInput.value = '250px'; canvasHeightInput.value = '250px'; changeValue(); }
canvasPreset7.onclick = () => { canvasWidthInput.value = '90%'; canvasHeightInput.value = '90%'; changeValue(); }
canvasPreset8.onclick = () => { canvasWidthInput.value = '60%'; canvasHeightInput.value = '60%'; changeValue(); }
canvasPresetSwitch.onclick = () => {
    let help = canvasWidthInput.value;
    canvasWidthInput.value = canvasHeightInput.value;
    canvasHeightInput.value = help;
    changeValue();
}

const changeValue = () => {
    canvasWidth.value = canvasWidthInput.value.replace('px', '');
    canvasHeight.value = canvasHeightInput.value.replace('px', '');
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