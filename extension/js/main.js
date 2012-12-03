//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
    }
}, true);

$(document).ready(function () {
		$(document).find(":contains('=#Whisper')").livequery(decrypt);
	});
	
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
	return "=#Whisper-" + group_id + "-" + encrypted.toString() + " Whisper#=";
}

    function decrypt() {
	  html = $(document.body).html().split("=#Whisper");
	  var match;
	  for( i=0;i<html.length;i++){
		 // alert(html[i])
		  trim = html[i].trim().replace(/<[^>]*>|\s/gm, "");
		  match = /-([a-zA-Z0-9]{12})-([^]+)Whisper#=/gm.exec(trim);
		  if(match != null && match.length > 2){
			  body = $(document.body).html();
			  encrypted = match[2];
			  decrypted = decrypt_msg(match[1], encrypted);
			  $(document.body).html(body.replace("=#Whisper" + match[0], decrypted))
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


