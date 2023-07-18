<?php 
include_once "connectDB.php";
$_POST = json_decode(file_get_contents("php://input"), true);
@$name = $_POST['name'];
@$email = $_POST['email'];
@$subject = $_POST['subject'];
@$message = $_POST['message'];

$response = "";
if ($name == ""){
    $response = $response ."name";
}
if ($email == "") {
    $response = $response . "email";
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = $response . "notmail";    
};
if ($subject == "") {
    $response = $response . "subject";
}
if ($message == "") {
    $response = $response . "message";
} 


if ($response == "") {
    $insert = $mysqli -> execute_query('INSERT INTO usermessages (name, email, subject, message ,date) VALUES (? , ? , ? , ? , NOW())', array($name, $email, $subject, $message)); 
    if ($insert === false){
        echo ($insert);
        die ("lol");
    } else {
    die ("success");}
} else {
    die($response);
}