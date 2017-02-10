let text, commaFlag, quoteFlag, val,
    textArea = document.getElementById('field'),
    commasBtn = document.getElementById('commas'),
    quotesBtn = document.getElementById('quotes'),
    editBtn = document.getElementById('edit');


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
}, false);


commasBtn.addEventListener('click', function() {
    if (!commaFlag) {
        textArea.value = textArea.value.split(' ').join(', ');
        textArea.value = textArea.value.split('\n').join(', ');

    	}
    }
}, false);

quotesBtn.addEventListener('click', function() {}, false);