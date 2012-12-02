// debugger;

function login() {
	var username = document.getElementById('inputUsername').value;
	var password = document.getElementById('inputPassword').value;
}

document.addEventListener('DOMContentLoaded', function() {
	$(".login").show();
	$("#btn-login").click(function ()
	{
		login();
		$(".login").hide();
		$(".success").show();
	});
});
