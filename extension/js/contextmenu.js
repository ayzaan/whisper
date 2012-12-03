function attach(e)
{	
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {method: "enableEncrypt"}, null);
	});
	
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {method: "enableDecrypt"}, null);
    }
	
});

chrome.contextMenus.create ({
	title:"Encrypt with Whisper", contexts:["editable"], onclick:attach
});