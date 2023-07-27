<?php 
include_once 'connectDB.php';
$cols = $mysqli -> query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_bools'");
$col_count = $cols -> num_rows;

$output = array();
for ($i=0; $i < $col_count; $i++) { 
    $stored = $cols -> fetch_assoc();

    $choice = $stored["COLUMN_NAME"];
    if ($choice != "product_id") {
    array_push($output, " 
    <a onclick='renderAgainProducts(`$choice`)' class = 'd-flex flex-row' style = 'cursor: pointer'> $choice</a>
    ");}
}
echo json_encode($output);
 

?>