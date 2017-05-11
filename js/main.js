let val,
    textArea = document.getElementById('field'),
    base64Area = document.getElementById('base'),
    base64AreaResult = document.getElementById('baseResult'),
    baseBtn = document.getElementById('base64'),
    commasBtn = document.getElementById('commas'),
    quotesBtn = document.getElementById('quotes'),
    editBtn = document.getElementById('edit'),
	initBtn = document.getElementById('init'),
	copyBtn = document.getElementById('copy'),
	result = document.getElementById('result'),
	clipboard = new Clipboard(copyBtn),
    flag;

baseBtn.addEventListener('click', function() {
    val = base64Area.value;
    let arr = val.split(', ');
    // let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
        // resultArr.push(window.atob(arr[i]).slice(0, -11));
        let p = document.createElement('p');
        p.innerHTML = window.atob(arr[i]);
        p.className = 'decodedHash';
        result.appendChild(p);
    }
    // base64AreaResult.value = resultArr.join('\n');
}, false);

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
        textArea.value = val.split(' ').join(', ');
    } else {
        textArea.value = val.split('\n').join(',\n');
    }
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

quotesBtn.addEventListener('click', function() {
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
    console.log(flag);
}, false);