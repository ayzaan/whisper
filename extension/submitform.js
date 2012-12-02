// debugger;

function what() {
	var username = document.getElementById('inputUsername').value;
	var password = document.getElementById('inputPassword').value;
	var nameRef = new Firebase('https://whisper.firebaseIO.com/users');
	// nameRef.child(username).set({});
	var newUser = new Firebase('https://whisper.firebaseIO.com/users/');
	alert("j");
}

document.addEventListener('DOMContentLoaded', function() {
	$(".login").show();
	$("#btn-login").click(function ()
	{
		$(".login").hide();
		$(".success").show();
	});
});
