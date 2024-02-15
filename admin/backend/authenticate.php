<?php 

require_once "./firebase-jwt/JWT.php";
require_once "./firebase-jwt/key.php";
use Firebase\JWT\JWT;
use Firebase\JWT\key;
include_once "../../components/backend/connectDB.php";
if (!isset(getallheaders()["Authorization"])) {
    throw new Exception("no Authorization in header");
}

if (!isset(getallheaders()["ConnectTo"])) {
    throw new Exception("no ConnectTo in header");
}

$usertoken =  getallheaders()["Authorization"];
@$tokenOBJ = JWT::decode($usertoken, new Key('key', 'HS256'));
//A real program will never have a key this weak
@$token = (array)$tokenOBJ;
@$username = trim($token['username']);


$search = $mysqli->prepare("SELECT id, pass, permission FROM users WHERE username = BINARY ? ");
$search->bind_param("s", $username);
$search->execute();
$result = $search->get_result();
$stored = $result->fetch_assoc();
if (@$stored['pass'] == null || substr(@$stored['pass'], -6) !== @$token['pass'] || @$stored['id'] !== @$token['id']){
    throw new Exception("invalid token");
};

$showfiles = array('showproducts.php','showadminlist.php','showsitevars.php');
$accessableFiles = array('readyproductedit.php', 'editsitevars.php', 'newproductentry.php', 'addproduct.php', 'showproductbools.php', 'editproduct.php', 'deleteproduct.php');
$adminFiles = array('editadminlist.php');
//this variable would include all non-restricted files in a bigger project
$directTo =  getallheaders()['ConnectTo'];
if (in_array($directTo, $accessableFiles)){
// in a real program all includable files would be out of the server directory to make it impossible to access without this file.
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
    die($stored['permission']);
};
?>