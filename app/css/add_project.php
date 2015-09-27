<?php

	$name = $_POST['projectName'];
	$url = $_POST['projectUrl'];
	$text = $_POST['prajectText'];

	$data = array();
// function handle_error($system_error_message) {
// 		die ($system_error_message);
// 	};
	$image_fildname = "user_pic";
	$err = $_FILES[$image_fildname]['error'];

	//|| $err !== 0

	if ($name === '' || $url === '' || $text === '' ) {
		$data['status'] = 'error';
		$data['text'] = 'заполните нужные поля';
	} else {
		$data['status'] = 'OK';
		$data['text'] = 'молодец';
	};

// function handle_error($system_error_message) {
// 	die ($system_error_message);
// };


	// $upload_dir = "user_images/";

	// $php_errors = array(1 => 'Превышен мах. размер файла, указанный в php.ini',
	// 	2 => 'Превышенм мах. размер файла, указанный в форме html',
	// 	3 => 'Была отправлена только часть файла',
	// 	4 => 'Файл для отправки не был выбран');

 //Проверка на ошибки при отправке

	 // $err === 0
	 // 	|| handle_error ($php_errors[$err]);

	 // 	if($err !== 0) {
	 // 		$data['status'] = 'error';
		// 	$data['text'] = 'заполните нужные поля';
	 // 	} else {
		// 	$data['status'] = 'OK';
		// 	$data['text'] = 'молодец';
		// };





	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>