var EncryptedForms = new function ()
{
	this.forms = new Array();
	
	this.add = function(element)
	{
		if (element.form != null)
		{
			$(element).closest(".uiTypeahead").css({ "background-color": "#5cff68", "background": "top right 10px no-repeat url('"+chrome.extension.getURL("img/lock.png")+"')" });
			EncryptedForms.forms[element.form.name] = [element, false];
			$(element.form).submit(function (e)
			{
				if (!EncryptedForms.forms[e.target.name][1])
				{
					EncryptedForms.forms[e.target.name][1] = true;
					EncryptedForms.forms[e.target.name][0].value = encrypt(EncryptedForms.forms[e.target.name][0].value);
					$(e.target).find("input[name='xhpc_message']").val(EncryptedForms.forms[e.target.name][0].value);
					$(e.target).find(".highligherContent .hidden_elem").html(EncryptedForms.forms[e.target.name][0].value);
					setTimeout("EncryptedForms.submit('"+e.target.name+"');", 10);
					return false;
				}
			});
		}
		else 
		{
			$(clickedEl).closest("table").css({ "background": "top right no-repeat url('"+chrome.extension.getURL("img/lock.png")+"')", "background-color": "#5cff68" });
			/*clickedEl.addEventListener('keydown', function(e){ 
				if (e.keyCode == 13 && !e.shiftKey) { 
					encrypt(clickedEl)
					return false;
				} 
			}, true);*/
			$(clickedEl).parent().get(0).addEventListener('keydown', function(e){ 
				if (e.keyCode == 13 && !e.shiftKey) { 
					clickedEl.value = encrypt(clickedEl.value);
					return false;
				} 
			}, true);
		}
	}
	
	this.submit = function(id)
	{
		$(this.forms[id][0].form).find("input[type='submit'], button").trigger("click");
		this.forms[id][1] = false;
	}
}	