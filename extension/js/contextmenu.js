function attach(e)
{	
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {method: "enableEncrypt"}, null);
	});
	
}

function setMenu(groups) {
	var differentGroups = groups.split();
	for (var i = differentGroups.length - 1; i >= 0; i--) {
		chrome.contextMenus.create ({
			title:differentGroups[i], contexts:["editable"], onclick:attach,
		});
	};
}

// chrome.contextMenus.create ({
// 	title:"Encrypt with Whisper", contexts:["editable"], onclick:attach,
// });

// chrome.contextMenus.create ({
// 	title:"Option 1", contexts:["editable"], onclick:attach,
// });

// chrome.contextMenus.create ({
// 	title:"Option 2", contexts:["editable"], onclick:attach, 
// });