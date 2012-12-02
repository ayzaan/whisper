//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
    }
}, true);

document.addEventListener('DOMContentLoaded', function() {
		alert('yo');
		
		$(":contains('=#Whisper')").livequery(decrypt);
	});

    
function encrypt(value, group_id){
	encrypted = CryptoJS.AES.encrypt(value, key);
	return "=#Whisper-" + 1 + "-" + encrypted.toString() + "Whisper#=";
}
	
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "enableEncrypt")
	{
		EncryptedForms.add(clickedEl);
    }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "enableDecrypt")
	{
		alert("hi");
		var decrypted = CryptoJS.AES.decrypt("%s","7de7aaf36c9d9170e325ff2aa0757e5e");
		$(clickedEl).html(decrypted);
    }
});

    function decrypt() {
	  $(this).html().replace(/=#Whisper-([0-9]{11})(.*)Whisper#=/gm,decrypt_msg('$1', '$2') );
    }

	function decrypt_msg(group_id, msg){
		chrome.storage.local.get(["keys"], function(data)
		{
			if (data.username == null) 
				return "You must login to view this encrypted message";
			else
			{
				keys = JSON.parse(data.keys);
				for(i=0;i<keys.Maths.length;i++){
					key = keys[i].key;
					if (group_id == keys[i].group_id){
						return CryptoJS.AES.decrypt(msg, key);
					}
				}
			}
		});
	}


