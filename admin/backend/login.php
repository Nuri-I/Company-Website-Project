<?php

require_once "./firebase-jwt/JWT.php";
require_once "./firebase-jwt/key.php";
use Firebase\JWT\JWT;
include_once "../../components/backend/connectDB.php";

$_POST = json_decode(file_get_contents("php://input"), true);
@$password = $_POST['password'];
@$username = $_POST['username'];
if (!$_POST){
    $response = [
        'message' => "Unable to retrieve credentials"];
    echo json_encode($response);
    exit();
}



$search = $mysqli->prepare("SELECT * FROM users WHERE username = BINARY ? ");
$search->bind_param("s", $username);
$search->execute();
$result = $search->get_result();
$stored = $result->fetch_assoc();
//Check for passwords associated with username
if (!@$stored["pass"]){
    echo json_encode($response =['message' => "The Username is not registered"]);
    exit();
}
if (!password_verify($password, $stored['pass'])){
    echo json_encode($response = ['message' => "The Password is Wrong"]);
    exit();
}

$key = "key";
//a real project would not contain a token key like this
$payload = [
    'username' => $stored['username'],
    'pass' => substr($stored['pass'], -6),
//the reason for adding part of the password hash is to increase the possibility that the session token changes up on password changes
    'id' => $stored['id']
];
$token = JWT::encode($payload, $key, 'HS256');
$response = [
    'message' => "Successfully Logged in",
    'token' => $token
];
echo  json_encode($response);
exit();

?>