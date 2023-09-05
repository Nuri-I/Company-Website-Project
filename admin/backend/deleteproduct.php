<?php 
    $_POST = json_decode(file_get_contents('php://input'), true);
    $deleteQ1 = ("DELETE FROM product_bools WHERE product_id = ?");
    $deleteQ2 = ("DELETE FROM product_stats WHERE product_id = ?");
    $params = array($_POST['product_id']);
    $delete_product_1 = $mysqli -> execute_query($deleteQ1, $params);
    $delete_product_2 = $mysqli -> execute_query($deleteQ2, $params);
    echo($delete_product_1);
    echo($delete_product_2);
    if (($delete_product_1 == 1) && ($delete_product_2 == 1)){
        $image_path = "../../components/images/".$_POST['product_id'].".webp";
        @unlink($image_path);
    }
?>