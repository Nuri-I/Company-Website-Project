<?php 
include_once "../../components/backend/connectDB.php";

$rows = $mysqli -> query("SELECT MAX(product_id) FROM product_stats");
$row_arr = $rows -> fetch_array();
$product_id = $row_arr["MAX(product_id)"] + 1;

$buttons = "
<label for='confirm_product'>Ürünü Kaydet</label>
<button id='confirm_product'>
<img src='..\..\components\images\/confirm-edit.svg' alt='Ürünü Ekle'>
</button>
<label for='cancel_product'>Kaydı İptal Et</label>
<button id='cancel_product'>
<img src='..\..\components\images\cancel.svg' alt='Ürünü Eklemekten Vazgeç'>
</button>";

$response = array(
    'productid'=> $product_id,
    'buttons'=> $buttons
);
echo json_encode($response);

?>