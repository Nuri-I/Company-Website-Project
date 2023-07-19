<?php 
require_once "./firebase-jwt/JWT.php";
require_once "./firebase-jwt/key.php";
use Firebase\JWT\JWT;
use Firebase\JWT\key;
include_once "../../components/backend/connectDB.php";

$_POST = json_decode(file_get_contents("php://input"), true);

@$usertoken =  getallheaders()['Authorization'];
@$tokenOBJ = JWT::decode($usertoken, new Key('key', 'HS256'));
//A real program will never have a key this weak
@$token = (array)$tokenOBJ;
@$username = $token['username'];

$search = $mysqli->prepare("SELECT id, pass, permission FROM users WHERE username = BINARY ? ");
$search->bind_param("s", $username);
$search->execute();
$result = $search->get_result();
$stored = $result->fetch_assoc();

if (@$stored['pass'] == null || substr(@$stored['pass'], -6) !== @$token['pass'] || @$stored['id'] !== @$token['id']){
    die("Invalid Token");
};

$showfiles = array('showproducts.php','showadminlist.php','showsitevars.php');
$accessableFiles = array('editproducts.php', 'editsitevars.php');
$adminFiles = array('editadminlist.php');
//this variable would include all non-restricted files in a bigger project
@$directTo =  getallheaders()['ConnectTo'];
if (in_array($directTo, $accessableFiles)){
    $permission = 'granted';
// in a real program $permission variable would be treated like a key  
//to reduce to chance of mailicous parties to guess or brute force the variable and access the backend without proper authorazition
    include($directTo);
    exit();
};
if (in_array($directTo, $accessableFiles) && $stored['permission'] >= 1){
    $permission = 'granted';
    include($directTo);
    exit();
} else if (in_array($directTo, $adminFiles) && $stored['permission'] >= 2) {
    $permission = 'granted';
    include($directTo);
    exit();
} else if (in_array($directTo, $showfiles) && $stored['permission'] >= 0) {
    $permission = 'granted';
    include($directTo);
    exit();
} else {
    die("you are not authorised");
};
?>