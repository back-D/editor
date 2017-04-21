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
	clipboard = new Clipboard(copyBtn),
    flag = {
        'comma': false,
        'quote': false,
        'row': true
    };

baseBtn.addEventListener('click', function() {
    val = base64Area.value;
    let arr = val.split(', ');
    let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
        resultArr.push(window.atob(arr[i]).slice(0, -11));
    }
    base64AreaResult.value = resultArr.join('\n');
}, false)

textArea.addEventListener('input', function() {
	initBtn.style.display = 'block';
    editBtn.style.display = 'none';
    commasBtn.style.display = 'none';
    quotesBtn.style.display = 'none';
    copyBtn.style.display = 'none';
    flag = {
        'comma': false,
        'quote': false,
        'row': true
    };
    val = textArea.value;
}, false);

initBtn.addEventListener('click', function() {
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
	}
	initBtn.style.display = 'none';
	editBtn.style.display = 'block';
	commasBtn.style.display = 'block';
	quotesBtn.style.display = 'block';
	copyBtn.style.display = 'block';
	edit();
}, false);

function deleteCommas() {
    val = textArea.value;
    if (flag.row) {
        textArea.value = val.split(', ').join(' ');
    } else {
        textArea.value = val.split(',\n').join('\n');
	}
    flag.comma = false;
}

function addCommas() {
    val = textArea.value;
    if (flag.row) {
        textArea.value = val.split(' ').join(', ');
    } else {
        textArea.value = val.split('\n').join(',\n');
    }
    flag.comma = true;
}

function edit() {
    val = textArea.value;
    if (flag.row) {
        let arr = val.split(' ');
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1);
                --i;
            }
        }
        textArea.value = arr.join('\n');
        flag.row = false;
    } else {
        let arr = val.split('\n');
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1);
                --i;
            }
        }
        textArea.value = arr.join(' ');
        flag.row = true;
    }
}

editBtn.addEventListener('click', edit, false);

commasBtn.addEventListener('click', function() {
    val = textArea.value;
    if (!flag.comma) {
        addCommas();
        flag.comma = true;
    } else deleteCommas();

}, false);

quotesBtn.addEventListener('click', function() {
	//Дальше будет совсем говнище
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