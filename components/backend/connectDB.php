<?php 
$mysqli = new mysqli("localhost","root","", "company_website");
if ($mysqli->connect_error) {
$err_message = "Can not connect to the Database" .$mysqli->connect_error;
echo $err_message;
exit();
} 
?>