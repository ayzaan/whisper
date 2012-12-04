<?php
	header("Access-Control-Allow-Origin: *");
	include "func/serial_generator.php";
	
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
	/*else if ($_REQUEST['action'] == 'checkuser'){
		$sql_result = mysql_result(mysql_query(sprintf("SELECT id FROM users WHERE username='%s'", $_REQUEST['username'])));
		if(mysql_num_rows($sql_result) > 0)
		{
			$result['success'] = true;
			$result['id'] = $sql_result;
		}
		else $result['success'] = false;
		echo json_encode($result);
	}*/
	else if ($_REQUEST['action'] == 'new_group')
	{
		$serial = serial_generator();
		$query = mysql_query(sprintf("SELECT * FROM users WHERE username='%s' AND pw='%s'", $_REQUEST['username'], $_REQUEST['pw']));
		if (mysql_num_rows($query) > 0)
		{
			$array_result = mysql_fetch_array($query);
			$id = $array_result['id'];
			$sql_result = mysql_query(sprintf("INSERT INTO groups (id, owner_id, name) VALUES ('%s', '%s', '%s')", $serial, $id, $_REQUEST['group_name']));
			$result['success'] = true;
			$result['id'] = $serial;
		}
		else $result['success'] = false;
		echo json_encode($result);
	}
	else if ($_REQUEST['action'] == 'share'){
		$query = mysql_query(sprintf("SELECT * FROM users WHERE username='%s' AND pw='%s'", $_REQUEST['username'], $_REQUEST['pw']));
		$query2 = mysql_query(sprintf("SELECT * FROM users WHERE username='%s'", $_REQUEST['recipient']));
		if (mysql_num_rows($query) > 0 && mysql_num_rows($query2) > 0 && $_REQUEST['key'] != NULL && strlen($_REQUEST['key']) == 256)
		{
			$user = mysql_fetch_array($query);
			$recipient = mysql_fetch_array($query2);
			$id = $user['id'];
			$recipient_id = $recipient['id'];
			$query = mysql_query(sprintf("SELECT * FROM groups WHERE id='%s' AND owner_id='%s'", $_REQUEST['group_id'], $id));
			if (mysql_num_rows($query) > 0)
			{
				mysql_query(sprintf("INSERT INTO queue (group_id, recipient_id, aes_key) VALUES ('%s', %d, '%s')", $_REQUEST['group_id'], $recipient_id, $_REQUEST['key']));
				$result['success'] = true;
			}
			else $result['success'] = false;
		}
		else $result['success'] = false;
		echo json_encode($result);
	}
	else if ($_REQUEST['action'] == 'retrieve'){
		$query = mysql_query(sprintf("SELECT * FROM users WHERE username='%s' AND pw='%s'", $_REQUEST['username'], $_REQUEST['pw']));
		if (mysql_num_rows($query) > 0)
		{
			$user = mysql_fetch_array($query);
			$id = $user['id'];
			$sql_result = mysql_query(sprintf("SELECT * FROM queue where recipient_id = '%d'", $id));
			if (mysql_num_rows($sql_result) > 0)
			{
				$result['groups'] = array();
				while ($row = mysql_fetch_array($sql_result))
				{
					mysql_query(sprintf("DELETE FROM queue WHERE group_id = '%s' AND recipient_id = '%d' LIMIT 1", $row['group_id'], $id));
					$group = array($row['group_id'], $row['aes_key']);
					$result['groups'][] = $group;
				}
				$result['success'] = true;
			}
			else $result['success'] = false;
		}
		else $result['success'] = false;
		
		echo json_encode($result);
	}
?>