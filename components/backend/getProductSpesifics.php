<?php 
include_once 'connectDB.php';
$cols = $mysqli -> query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_bools'");
$col_count = $cols -> num_rows;
//if you delete the bellow line product_ID will be added to the choosabble product bools
$stored = $cols -> fetch_assoc();

$output = array();
for ($i=0; $i < $col_count-1; $i++) { 
    $stored = $cols -> fetch_assoc();
    $choice = $stored["COLUMN_NAME"];
    array_push($output, " 
    <a onclick='renderAgainProducts(`$choice`)' class = 'd-flex flex-row' style = 'cursor: pointer'> $choice</a>
    ");
}
echo json_encode($output);
 

?>