<?php



/**
 * 
 */
function dbConnect(){
	global $config;

	$connect = mysqli_connect(
		$config['db']['host'],
		$config['db']['login'],
		$config['db']['password'],
		$config['db']['db']
	);


	if (!$connect) { 
	   printf("Невозможно подключиться к базе данных. Код ошибки: %s\n", mysqli_connect_error()); 
	   exit; 
	} 


	return $connect;
}