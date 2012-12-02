function firebasesucks(info)
{
	alert(info[0]);
 //do stuff here
 //chrome.tabs.create({url: "https://www.google.com/search?q=firebase+sucks%3F&oq=firebase+sucks%3F&aqs=chrome.0.57.1610&sugexp=chrome,mod=1&sourceid=chrome&ie=UTF-8"})
}

function attach(info)
{
	// check if logged in
	// if not logged in, tell user to click on button on top left and login
	// if logged in, then either add the other person's username on whisper, or attach the key in link
}

chrome.contextMenus.create ({
    title:"Encrypt with Whisper", contexts:["editable"], onclick:firebasesucks
});

chrome.tabs.sendRequest(tab.id, 'getSelection', sendRequestCallbackHandler);

function sendRequestCallbackHandler(response) {
   // response contains the selected text
   console.log(String(response));
}