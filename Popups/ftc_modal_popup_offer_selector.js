

var allElems = document.getElementsByTagName('input');
for (i = 0; i < allElems.length; i++) {
    if (allElems[i].type == 'radio' && allElems[i].value == '$459.95') {
        allElems[i].checked = true;
    }
}


