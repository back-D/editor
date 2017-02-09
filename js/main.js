let text, commaFlag, quoteFlag,
    textArea = document.getElementById('field'),
    commasBtn = document.getElementById('commas'),
    quotesBtn = document.getElementById('quotes');

// function addCommas() {
//     textArea.value = textArea.value.split(' ').join(', ');
// }
//
// function addQuotes() {
//
// }


commasBtn.addEventListener('click', function() {
    if (!commaFlag) {
        textArea.value = textArea.value.split(' ').join(', ');
        textArea.value = textArea.value.split('\n').join(', ');

    } else {
        alert('Already add commas');
    }
}, false);

quotesBtn.addEventListener('click', function() {}, false);

