// debugger;

function what() {
	var username = document.getElementById('inputUsername').value;
	var password = document.getElementById('inputPassword').value;
	var nameRef = new Firebase('https://whisper.firebaseIO.com/users');
	nameRef.child(username).set({});
	var newUser = new Firebase('https://whisper.firebaseIO.com/users/'+username);
	newUser.child("password").set(password);
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get(["username", "pw"], function(data)
	{
		if (data.username == null) $(".login").show();
		else
		{
			$("#loggedin").html(data.username);
			$(".success").show();
		}
	});
	$("#btn-register").click(function ()
	{
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=register&username="+$("#username").get(0).value+"&pw="+$("#pw").get(0).value, function (data)
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
		$.getJSON("http://www.projectvoid.com/whisper/whisper_controller.php?action=login&username="+$("#username").get(0).value+"&pw="+$("#pw").get(0).value, function (data)
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
		chrome.storage.local.get(["username", "pw"], function(data)
		{
			if (data.username != null)
			{
				$(".login").show();
				$(".success").hide();
				chrome.storage.local.set({'username' : null});
				chrome.storage.local.set({'pw' : null});
			}
		});
	});
});
