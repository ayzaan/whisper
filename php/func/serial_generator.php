<?php
	function serial_generator($length = 12)
{
	$characters = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
	$key = "";
	for ($i=0; $i < $length; $i++)
	{
		$key .= (rand(0, 1) == 1) ? strtoupper($characters[rand(0, count($characters))]) : $characters[rand(0, count($characters))];	
	}
	return $key;
}
?>