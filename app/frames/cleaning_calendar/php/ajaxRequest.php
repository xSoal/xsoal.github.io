<?php


$config = require_once('config.php');

require_once('dbConnect.php');

$link = dbConnect();





/**
 * 
 */
class Responce
{
	
	function __construct($request)
	{
		global $link;
		$this->link = $link;


		if(isset($request['GetAllOrders'])){
			$this->getAllDataOfOrders();
		}
		// $this->getAllDataOfOrders();
	}

	function getAllDataOfOrders(){

		$result = $this->link->query('SELECT * from booking_form ORDER BY id ASC');

		$data = Array();
		while( $row = $result->fetch_assoc() ){
			$data[$row['id']] = $row;
			$data[$row['id']]['email'] = strtolower($data[$row['id']]['email']);
		}

		$data = json_encode($data);
		echo $data;
	}



}



// $fakePost = Array();
// $fakePost['GetAllOrders'] = 'true';
// $request  = $fakePost;


$request  = $_POST;
$responce = new Responce($request);



function dd($value=''){
	// echo "<pre>";
	// var_dump($value);
	// echo "</pre>";
}