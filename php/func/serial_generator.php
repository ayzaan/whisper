<?php
	function serial_generator($length = 12)
	{
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		$str = "";
		for ($i=0; $i < $length; $i++) $str .= substr($chars, (rand()*(sizeof($chars)-1)), 1);
		return $str;
	}
?>