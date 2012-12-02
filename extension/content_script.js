//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedEl = event.target;
    }
}, true);

$("\\:contains(=#Whisper)").livequery(decrypt);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method == "enableEncrypt")
	{
		EncryptedForms.add(clickedEl);
    }
});

function encrypt(field){
   //generate random string
    var key = CryptoJS.lib.WordArray.random(128/8).toString();
    var group_id = CryptoJS.lib.WordArray.random(11).toString();
    
	//Share with friends here
	
    encrypted = CryptoJS.AES.encrypt(field.value, key);
    key.value = "=#Whisper-" + group_id + "-" + encrypted.toString() + "Whisper#=";
}

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


