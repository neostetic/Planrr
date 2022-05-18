let content = document.getElementById('content');
let header = document.getElementById('header');
let contextmenu = document.getElementById('contextmenu');
let contextNewButton = document.getElementById('contextNewButton')
let contextEditButton = document.getElementById('contextEditButton')
let contextCopyButton = document.getElementById('contextCopyButton')
let contextCopyTextButton = document.getElementById('contextCopyTextButton')
let contextPasteButton = document.getElementById('contextPasteButton')
let contextDeleteButton = document.getElementById('contextDeleteButton')

content.onclick = () => {
    closeContextmenu();
}

header.onclick = () => {
    closeContextmenu();
}

infoBox.onclick = () => {
    closeContextmenu();
}

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        contextmenu.style.display = 'flex';
        let contX = contextmenu.offsetWidth;
        let contY = contextmenu.offsetHeight;
        if (posX > window.innerWidth - contX) {
            contextmenu.style.left = (posX - contX) + 'px';
        } else {
            contextmenu.style.left = posX + 'px';
        }
        if (posY > window.innerHeight - contY) {
            contextmenu.style.top = (posY - contY) + 'px';
        } else {
            contextmenu.style.top = posY + 'px';
        }
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() {
        alert("You've tried to open context menu");
        window.event.returnValue = false;
    });
}

const closeContextmenu = () => {
    contextmenu.style.display = 'none';
}

contextNewButton.onclick = () => {
    createBlock(canvasPosX, canvasPosY);
    closeContextmenu();
}

let copyStyle = {
    style: '',
    background: '',
    width: '',
    height: '',
    innerText: ''
};

contextCopyButton.onclick = () => {
    if (selected !== '') {
        copyStyle.style = 'all';
        copyStyle.background = document.getElementById(selected).style.background;
        copyStyle.width = document.getElementById(selected + '-textarea').style.width;
        copyStyle.height = document.getElementById(selected + '-textarea').style.height;
        copyStyle.innerText = document.getElementById(selected + '-textarea').innerHTML;
        popupShow('Block copied');
    } else {
        popupShow('Nothing to copy');
    }
    closeContextmenu();
}

contextCopyTextButton.onclick = () => {
    if (selected !== '') {
        copyStyle.style = 'content';
        copyStyle.innerText = document.getElementById(selected + '-textarea').innerHTML;
        popupShow('Content copied');
    } else {
        popupShow('Nothing to copy');
    }
    closeContextmenu();
}

contextPasteButton.onclick = () => {
    if (copyStyle.style === '') {
        popupShow('Nothing to paste')
    } else {
        if (selected !== '') {
            if (copyStyle.style === 'all') {
                document.getElementById(selected).style.background = copyStyle.background;
                document.getElementById(selected + '-textarea').style.width = copyStyle.width;
                document.getElementById(selected + '-textarea').style.height = copyStyle.height;
                document.getElementById(selected + '-textarea').innerHTML = copyStyle.innerText;
                document.getElementById(selected + '-textarea').value = copyStyle.innerText;
            } else if (copyStyle.style === 'content') {
                document.getElementById(selected + '-textarea').innerHTML = copyStyle.innerText;
                document.getElementById(selected + '-textarea').value = copyStyle.innerText;
            }
            copyStyle.style = '';
            popupShow('Pasted');
        } else {
            popupShow('Nowhere to paste');
        }
    }
    closeContextmenu();
}

contextDeleteButton.onclick = () => {
    deleteBlock();
    closeContextmenu();
}

contextEditButton.onclick = () => {
    infoBox.style.display = 'block';
    importe.style.display = 'none';
    exporte.style.display = 'none';
    settings.style.display = 'block';
    newfile.style.display = 'none';
    if (selected !== '') {
        rangeWidth.value = sliceLast(document.getElementById(selected + '-textarea').style.width, 2);
        rangeHeight.value = sliceLast(document.getElementById(selected + '-textarea').style.height, 2);
    }
    closeContextmenu();
}