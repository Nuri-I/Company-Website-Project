<?php 

$_POST_BODY = json_decode(file_get_contents('php://input'), true);

$product_id = $_POST_BODY['product_id'];

if (!is_numeric($product_id))(
exit()
);

$clean_id = $mysqli -> real_escape_string($product_id);

$search = $mysqli -> query("SELECT * FROM product_stats INNER JOIN product_bools ON product_stats.product_id = product_bools.product_id WHERE product_bools.product_id = $clean_id");
$editable = $search -> fetch_assoc();
echo json_encode($editable)

?>