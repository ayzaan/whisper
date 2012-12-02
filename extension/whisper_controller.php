<?php
	header("Access-Control-Allow-Origin: *");
	
	$mysql_connection = mysql_connect("localhost", "proje108_whisper", "@0P*D-qwKfT-");
	$connected =  mysql_select_db("proje108_whisper", $mysql_connection);
	
	$result = array();
	if ($_REQUEST['action'] == 'register')
	{
		if (mysql_num_rows(mysql_query(sprintf("SELECT * FROM users WHERE username='%s'", $_REQUEST['username']))) == 0)
		{
			if (mysql_query(sprintf("INSERT INTO users (username, pw) VALUES ('%s', '%s')", $_REQUEST['username'], sha1($_REQUEST['pw']))))
			{
				$result['success'] = true;
				$result['username'] = $_REQUEST['username'];
				$result['pw'] = sha1($_REQUEST['pw']);
			}
			else $result['success'] = false;
		}
		else $result['success'] = false;
		
		echo json_encode($result);
	}
	else if ($_REQUEST['action'] == 'login')
	{
		if (mysql_num_rows(mysql_query(sprintf("SELECT * FROM users WHERE username='%s' AND pw='%s'", $_REQUEST['username'], sha1($_REQUEST['pw'])))) == 1)
		{
			$result['success'] = true;
			$result['username'] = $_REQUEST['username'];
			$result['pw'] = sha1($_REQUEST['pw']);
		}
		else $result['success'] = false;
		
		echo json_encode($result);
	}
?>