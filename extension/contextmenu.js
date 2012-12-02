function firebasesucks(info)
{
 //do stuff here
 chrome.tabs.create({url: "https://www.google.com/search?q=firebase+sucks%3F&oq=firebase+sucks%3F&aqs=chrome.0.57.1610&sugexp=chrome,mod=1&sourceid=chrome&ie=UTF-8"})
}

function encrypt(field){
	alert(field.value);
	field.value = 'This is an encrypted message'
}

function attach(e)
{
	if (this.form != null){
		alert('we have a form')
		this.form.addEventListener('submit', function(e){ encrypt(this) }, true);
	} else {
		this.addEventListener('keypress', function(e){ alert('keypress'); if (e.keyCode == 13 && !e.shiftKey) { encrypt(this) } }, true);
	}
	alert('Attached' + this.value);
}

chrome.contextMenus.create ({
    title:"Encrypt with Whisper", contexts:["editable"], onclick:attach
});