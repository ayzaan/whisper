function firebasesucks(info)
{
 //do stuff here
 chrome.tabs.create({url: "https://www.google.com/search?q=firebase+sucks%3F&oq=firebase+sucks%3F&aqs=chrome.0.57.1610&sugexp=chrome,mod=1&sourceid=chrome&ie=UTF-8"})
}



function attach(e)
{	
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {method: "enableEncrypt"}, null);
	});
	
}

function decryptattach(e)
{

	chrome.tabs.getSelected(null,function(tab) {
		chrome.tabs.sendMessage(tab.id, {method:"enableDecrypt"}, null)
	})
}

chrome.contextMenus.create ({
	title:"Encrypt with Whisper", contexts:["editable"], onclick:attach
});

chrome.contextMenus.create({
	title:"Decrypt a Whisper", contexts:["selection"], onclick:decryptattach
});