//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
    }
}, true);
	
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "enableEncrypt")
	{
		EncryptedForms.add(clickedEl);
    }
	if(request.method == "enableDecrypt")
	{
		decrypt();
    }
});

    
function encrypt(value){
	var key = CryptoJS.lib.WordArray.random(128/8).toString();
	var group_id = Math.floor(Math.random() * Math.pow(2, 11));

	encrypted = CryptoJS.AES.encrypt(value, key);
	return "[!wisp | " + group_id + " ] " + encrypted.toString() + " [/wisp]";
}

    function decrypt ()
	{
	  var html = $('*:contains("[!wisp | ")');
	  if (html.length > 0)
	  {
		 for (var i = html.length-1; i >= 0; i--)
		 {
			var ele = $(html[i]);
			var text = ele.text();
			if (text.indexOf("[!wisp | ") != -1 && text.indexOf("[/wisp]") != -1)
			{
				var result = text.split("[")[1].split("]");
				var number = result[0].split("|")[1].trim();
				var encrypted = result[1].trim();
				ele.text(decrypt_msg(number, encrypted));
				decrypt();
			}
		 }
	  }
	}
	

	function decrypt_msg(group_id, msg){
		var key, username;
		chrome.storage.local.get(["username", "keys"], function(data)
		{
			
			if (data.username != null) {
				username = data.username;
				keys = JSON.parse(data.keys);
				for(i=0;i<keys.Maths.length;i++){
					
					if (group_id == keys[i].group_id){						
						key = keys[i].key;
					}
				}
			}
		});
		if (username == null){
			return "You must log in to view this message.";
		} 
		if (key == null ){
			return "You don't have access to this message.";
		}
		return CryptoJS.AES.decrypt(msg, key);
	}
	
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
	if ($("*:contains('[!wisp | ')").length > 0)
	{
		decrypt();
		setTimeout("decrypt()", 600);
	}
});

observer.observe(document, {
  subtree: true,
  attributes: true
});
