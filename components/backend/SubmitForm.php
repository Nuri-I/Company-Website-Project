<?php 
$_POST = json_decode(file_get_contents("php://input"), true);
@$name = $_POST['name'];
@$email = $_POST['email'];
@$subject = $_POST['subject'];
@$message = $_POST['message'];
//Handle if input is empty or can not be recieved, may be taken out soon with changes to front end code
if ($name == ""|| $email == ""||$subject == ""|| $message == ""){
    die("0");
} else {
    die("1");
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

?>