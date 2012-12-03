function attach(e)
{	
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {method: "enableEncrypt"}, null);
	});
	
}

chrome.contextMenus.create ({
	title:"Encrypt with Whisper", contexts:["editable"], onclick:attach
});