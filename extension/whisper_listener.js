function encrypt(info)
{
 //do stuff here
 chrome.tabs.create({url: "https://www.google.com/search?q=firebase+sucks%3F&oq=firebase+sucks%3F&aqs=chrome.0.57.1610&sugexp=chrome,mod=1&sourceid=chrome&ie=UTF-8"})
}

chrome.contextMenus.create({"title": "Encrypt with Whisper", "onclick": encrypt});