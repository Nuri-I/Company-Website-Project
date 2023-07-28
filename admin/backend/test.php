<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$formData= array_merge($_POST,$_FILES);

echo json_encode(array_keys($formData));

?>