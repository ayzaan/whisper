//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
    }
}, true);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "enableEncrypt") {
		if (clickedEl != null ) {
			if( clickedEl.form != null){
				alert('we have a form');
				clickedEl.form.addEventListener('submit', function(e){ encrypt(clickedEl) }, true);
			} else {
				alert("Attached to element " + clickedEl.id);
				clickedEl.addEventListener('keydown', function(e){ 
					if (e.keyCode == 13 && !e.shiftKey) { 
						encrypt(clickedEl) 
					} 
				}, true);
			}
		} else { 
			alert('wtf!');
		}
    }
});

function encrypt(field){
	field.value = 'This is an encrypted message'
}


