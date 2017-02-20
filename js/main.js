let val,
    textArea = document.getElementById('field'),
    commasBtn = document.getElementById('commas'),
    quotesBtn = document.getElementById('quotes'),
    editBtn = document.getElementById('edit'),
    flag = {
        'comma': false,
        'quote': false,
        'row': false
    };

textArea.addEventListener('input', function() {
    val = textArea.value;
    if (val.split(',').length > 1) {
        flag.comma = true;
    } else if (val.split('"').length > 1) {
        flag.quote = true;
    } else if (val.split(' ').length > 1) {
        flag.row = true;
    } else {
        for (let key in flag) {
            key = false;
        }
    }
}, false);

function deleteCommas() {
    val = textArea.value;
    if (val.split(',').length > 1) {
        textArea.value = val.split(',').join('');
        flag.comma = false;
    }
}

function addCommas() {
    val = textArea.value;
    if (flag.row) {
        textArea.value = val.split(' ').join(', ');
    } else {
        textArea.value = val.split('\n').join(', ');
    }
    flag.comma = true;
}

editBtn.addEventListener('click', function() {
	val = textArea.value;
	if (val.split(' ').length > 2) {
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
}, false);


commasBtn.addEventListener('click', function() {
    val = textArea.value;
    deleteCommas();
    if (flag.comma) {
        addCommas();
    }

}, false);

quotesBtn.addEventListener('click', function() {}, false);