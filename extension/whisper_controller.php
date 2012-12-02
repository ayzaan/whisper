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
	else if ($_REQUEST['action'] == 'checkuser'){
		$sql_result = mysql_result(mysql_query(sprintf("SELECT id FROM users WHERE username='%s'", $_REQUEST['username'])));
		if($sql_result){
			$result['success'] = true;
			$result['id'] = $sql_result;
		}
		else
			$result['success'] = false;
		echo json_encode($result);
	}
	else if ($_REQUEST['action'] == 'share'){
		$sql_result = mysql_result(mysql_query(sprintf("SELECT id FROM users WHERE username='%s'", $_REQUEST['username'])));
		$result['success'] = false;
		if ( $sql_result ){
			if ( mysql_query(sprintf("INSERT INTO keys (group_id, recipient_id, key) VALUES ('%d', '%d', '%s')", $_REQUEST['group_id'], $sql_result, $_REQUEST['key'])) ){
				$result['success'] = true;
			}
		}
		
		echo json_encode($result);
	}
	else if ($_REQUEST['action'] == 'retrieve'){
		$result['success'] = false;
		$sql_result = mysql_result(mysql_query("SELECT key FROM keys WHERE group_id = '%d' AND user_id = '%d'", $_REQUEST['group_id'], $_REQUEST['user_id']));
		if ( $sql_result ) {
			mysql_query(sprintf("REMOVE FROM keys WHERE group_id = '%d' AND user_id = '%d' LIMIT 1", $_REQUEST['group_id'], $_REQUEST['user_id']));
			$result['key'] = $sql_result;
			$result['success'] = true;
		}
		
		echo json_encode($result);
	}
?>