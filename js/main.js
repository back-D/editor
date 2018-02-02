;let val,
    textArea = document.getElementById('field'),
    gateway = document.getElementById('gateway'),
    baseBtn = document.getElementById('base64'),
    commasBtn = document.getElementById('commas'),
    quotesBtn = document.getElementById('quotes'),
    editBtn = document.getElementById('edit'),
	copyBtn = document.getElementById('copy'),
    postbackBtn = document.getElementById('postback'),
	result = document.getElementById('result'),
    lnResult = document.getElementById('lnResult'),
    colResult = document.getElementById('colResult'),
    lines = document.getElementById('lines'),
	clipboard = new Clipboard(copyBtn),
    timestamp = document.getElementById('timestamp-input'),
    timestampBtn = document.getElementById('timestamp'),
    crc32Btn = document.getElementById('crc32'),
    flag;

postbackBtn.addEventListener('click', function() {
    val = textArea.value;
    textArea.value = val.split(',').join(' ').split('"').join('').split("'").join('\n');
    val = textArea.value;
    let arr = val.split('\n');
    let option = gateway.options[gateway.selectedIndex].value;
    let eventName = prompt('Введи название ивента:', 'lead');
    for (let i = 0; i < arr.length; i++) {
        let img = document.createElement('img');
        let postbackLink = '//a.' + option + '.com/postback?c=' + arr[i] + '&e=' + eventName;
        if (option === 'adskeeper') {
            postbackLink = '//a.' + option + '.co.uk/postback?c=' + arr[i] + '&e=' + eventName;
        }
        img.setAttribute('src', postbackLink);
    }
    alert('OK');
}, false);

function clear() {
    let results = document.getElementsByClassName('decodedClickId');
    for (let i = results.length - 1; i >= 0; i--) {
        if (results[i]) {
            results[i].parentNode.removeChild(results[i]);
        }
    }
}

function deleteCommas() {
    checkFormat();
    val = textArea.value;
    if (flag.row && flag.space) {
        textArea.value = val.split(', ').join(' ');
    } else if (flag.row && !flag.space) {
        textArea.value = val.split(',').join(' ');
    } else {
        textArea.value = val.split(',\n').join('\n');
	}
}

function addCommas() {
    checkFormat();
    val = textArea.value;
    if (flag.row) {
        textArea.value = editArray(val.split(' ')).join(', ');
    } else {
        textArea.value = editArray(val.split('\n')).join(',\n');
    }
}

function editArray(origin) {
    let result = [];
    for (let i = 0; i < origin.length; i++) {
        if (origin[i] !== '' && origin[i] !== '\n') {
            result.push(origin[i]);
        }
    }
    return result;
}

function edit() {
    checkFormat();
    val = textArea.value;
    if (flag.row && flag.space) {
        let arr = val.split(' ');
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1);
                --i;
            }
        }
        textArea.value = arr.join('\n');
    } else if (flag.row && !flag.space) {
        let arr = val.split(',');
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1);
                --i;
            }
        }
        textArea.value = arr.join(',\n');
    } else {
        let arr = val.split('\n');
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1);
                --i;
            }
        }
        textArea.value = arr.join(' ');
    }
}

editBtn.addEventListener('click', edit, false);

commasBtn.addEventListener('click', function() {
    checkFormat();
    val = textArea.value;
    if (!flag.comma) {
        addCommas();
    } else deleteCommas();

}, false);

function checkFormat() {
    flag = {
        'comma': false,
        'quote': false,
        'row': true,
        'space': false
    };
    val = textArea.value;
    for (let i = 0; i < val.length; i++) {
        if (val[i] === '\n') {
            flag.row = false;
        }
        if (val[i] === ',') {
            flag.comma = true;
        }
        if (val[i] === '"' || val[i] === "'") {
            flag.quote = true;
        }
        if (val[i] === ' ') {
            flag.space = true;
        }
    }
}

function quotes() {
    checkFormat();

    if (!flag.quote) {
        if (flag.row) {
            if (flag.comma) {
                deleteCommas();
                let arr = textArea.value.split(' ');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = "'" + arr[i] + "'";
                }
                textArea.value = arr.join(', ');
                flag.comma = true;
            } else {
                let arr = textArea.value.split(' ');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = "'" + arr[i] + "'";
                }
                textArea.value = arr.join(' ');
            }
        } else {
            if (flag.comma) {
                deleteCommas();
                let arr = textArea.value.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = "'" + arr[i] + "'";
                }
                textArea.value = arr.join(',\n');
                flag.comma = true;
            } else {
                let arr = textArea.value.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = "'" + arr[i] + "'";
                }
                textArea.value = arr.join('\n');
            }
        }
        flag.quote = true;
    } else {
        val = textArea.value;
        if (flag.row) {
            if (flag.comma) {
                let arr = val.split(', ');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].slice(1, -1);
                }
                textArea.value = arr.join(', ');
            } else {
                let arr = val.split(' ');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].slice(1, -1);
                }
                textArea.value = arr.join(' ');
            }
        } else {
            if (flag.comma) {
                let arr = val.split(',\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].slice(1, -1);
                }
                textArea.value = arr.join(',\n');
            } else {
                let arr = val.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].slice(1, -1);
                }
                textArea.value = arr.join('\n');
            }
        }
        flag.quote = false;
    }
}

quotesBtn.addEventListener('click', quotes, false);

function convertTimestamp(timestamp) {
    let d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
}

timestampBtn.addEventListener('click', function() {
    val = timestamp.value;
    let result = document.getElementById('tsResult');
    result.innerHTML = convertTimestamp(val);
}, false);

function makeCRCTable() {
    let c;
    let crcTable = [];
    for(let n =0; n < 256; n++){
        c = n;
        for(let k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

function crc32(str) {
    let crcTable = window.crcTable || (window.crcTable = makeCRCTable());
    let crc = 0 ^ (-1);

    for (let i = 0; i < str.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
};

crc32Btn.addEventListener('click', function () {
    checkFormat();
    val = textArea.value;
    if(!flag.row && !flag.comma && !flag.quote) {
        let arr = textArea.value.split('\n');
        for(let i = 0; i < arr.length; i++) {
            arr[i] = crc32(arr[i]);
        }
        textArea.value = arr.join('\n');
    } else {
        alert('Wrong format');
    }
},false);

function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();

        let r = document.selection.createRange();
        if (r == null) {
            return 0;
        }

        let re = el.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);

        return rc.text.length;
    }
    return 0;
}

function rowCounter(el) {
    return el.value.split('\n').length;
}

function getRow(el) {
    let caret = getCaret(el);
    let text = el.value.substr(0, caret).split('\n');

    return text.length;
}

function getPosInRow(el) {
    let caret = getCaret(el);
    let text = el.value.substr(0, caret).replace(/^(.*[\n\r])*([^\n\r]*)$/, '$2');

    return text.length;
}

function rowLineCounter() {
    lnResult.innerHTML = getPosInRow(textArea);
    colResult.innerHTML = getRow(textArea);
    lines.innerHTML = rowCounter(textArea);
    return true;
}

textArea.addEventListener('click', rowLineCounter, false);
textArea.addEventListener('keyup', rowLineCounter, false);