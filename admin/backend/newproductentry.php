<?php 

$rows = $mysqli -> query("SELECT MAX(product_id) FROM product_stats");
$row_arr = $rows -> fetch_array();
$product_id = $row_arr["MAX(product_id)"] + 1;

$response = array(
    'product_id'=> $product_id
);
echo (json_encode($response));

?>