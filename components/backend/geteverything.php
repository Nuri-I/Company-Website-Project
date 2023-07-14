<?php 
include 'connectDB.php';
$search = $mysqli -> execute_query("SELECT * FROM site_vars");
$stored = $search -> fetch_assoc();
echo json_encode($stored);
exit();
?>