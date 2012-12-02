// debugger;

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get(["username", "pw", "keys"], function(data)
	{
		if (data.username == null) $(".login").show();
		else
		{
			$("#loggedin").html(data.username);
			$("#keys").html(data.keys);
			$(".success").show();
		}
	});
	$("#btn-register").click(function ()
	{
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=register&username="+$("#inputUsername").get(0).value+"&pw="+$("#inputPassword").get(0).value, function (data)
		{
			if (data['success'])
			{
				$(".login").hide();
				$(".success").show();
				$("#loggedin").html(data['username']);
				chrome.storage.local.set({'username' : data['username']});
				chrome.storage.local.set({'pw' : data['pw']});
			}
		});
	});
	$("#btn-login").click(function ()
	{
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=login&username="+$("#inputUsername").get(0).value+"&pw="+$("#inputPassword").get(0).value, function (data)
		{
			if (data['success'])
			{
				$(".login").hide();
				$(".success").show();
				$("#loggedin").html(data['username']);
				chrome.storage.local.set({'username' : data['username']});
				chrome.storage.local.set({'pw' : data['pw']});
			}
		});
	});
	$("#btn-logout").click(function ()
	{
		chrome.storage.local.get(["username", "pw", "keys"], function(data)
		{
			if (data.username != null)
			{
				$(".login").show();
				$(".success").hide();
				chrome.storage.local.set({'username' : null});
				chrome.storage.local.set({'pw' : null});
				chrome.storage.local.set({'keys' : null});
			}
		});
	});
	/*$("#btn-addFriend").click(function ()
	{
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=login&username="+$("#inputUsername").get(0).value+"&pw="+$("#inputPassword").get(0).value, function (data)
		{
			if (data['success'])
			{
				$(".login").hide();
				$(".success").show();
				$("#loggedin").html(data['username']);
				chrome.storage.local.set({'username' : data['username']});
				chrome.storage.local.set({'pw' : data['pw']});
			}
		});
	});*/

	$("#btn-addFriend").click(function ()
	{
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=addFriend&groupname="+$("").get(0).value+"&key="+$(""))
	});

	$("#btn-addGroup").click(function()
	{
		var key = CryptoJS.lib.WordArray.random(128/8).toString();
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=newGroup&groupname="+$("#inputGroupName").get(0).value, function(data)
		{
			if (data['success'])
			{
				var gid = data['groupid'];
				chrome.storage.local.set({key:gid});
			}
		})
	});
});
