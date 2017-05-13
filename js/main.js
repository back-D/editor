;let val,
    textArea = document.getElementById('field'),
    // base64Area = document.getElementById('base'),
    // base64AreaResult = document.getElementById('baseResult'),
    baseBtn = document.getElementById('base64'),
    commasBtn = document.getElementById('commas'),
    quotesBtn = document.getElementById('quotes'),
    editBtn = document.getElementById('edit'),
	// initBtn = document.getElementById('init'),
	copyBtn = document.getElementById('copy'),
	result = document.getElementById('result'),
	clipboard = new Clipboard(copyBtn),
    flag;

baseBtn.addEventListener('click', function() {
    val = textArea.value;
    textArea.value = val.split(' ').join('').split(',').join('').split('"').join('').split("'").join('\n');
    val = textArea.value;
    let arr = val.split('\n');
    clear();
    // let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i]) {
            continue;
        }
        try {
            createElements(arr[i]);
        } catch(e) {
            alert('Ошибка в ' + (i + 1) + '-м click_id');
        }
    }
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
                    arr[i] = '"' + arr[i] + '"';
                }
                textArea.value = arr.join(', ');
                flag.comma = true;
            } else {
                let arr = textArea.value.split(' ');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = '"' + arr[i] + '"';
                }
                textArea.value = arr.join(' ');
            }
        } else {
            if (flag.comma) {
                deleteCommas();
                let arr = textArea.value.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = '"' + arr[i] + '"';
                }
                textArea.value = arr.join(',\n');
                flag.comma = true;
            } else {
                let arr = textArea.value.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = '"' + arr[i] + '"';
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
    var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
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

function createElements(item) {
    let resultBlock = document.createElement('div');
    resultBlock.className = 'decodedClickId';
    result.appendChild(resultBlock);

    let decodedHash = document.createElement('span');
    let decodedHashValue = window.atob(item).slice(0, -11);
    decodedHash.innerHTML = decodedHashValue;
    decodedHash.className = 'decodedHash';
    resultBlock.appendChild(decodedHash);

    let clickTime = document.createElement('span');
    let timeValue = convertTimestamp(window.atob(item).slice(-10));
    clickTime.innerHTML = 'Click Time: ' + timeValue;
    clickTime.className = 'clickTime';
    resultBlock.appendChild(clickTime);

    let decoderLink = document.createElement('a');
    let decoderLinkValue = 'https://admin.marketgid.com/cab/admin/show-hash-decoder?hash=' + decodedHashValue;
    decoderLink.setAttribute('href', decoderLinkValue);
    decoderLink.setAttribute('target', '_blank');
    decoderLink.innerHTML = 'Декодер хеша';
    resultBlock.appendChild(decoderLink);
}