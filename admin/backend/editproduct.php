<?php
$error = "";
     if ($_POST['productName'] == ""){
          $error .= "name";
     }
     if ($_POST['productDesc'] == ""){
          $error .= "desc";
     }
     if ($_POST['productId'] == ""){
          die ("productId");
     }
     if ($error != ""){
     die ($error);
     }
     $product_id = $_POST['productId'];
     $img_dir = "";
     //upload file if image is changed
     if($_FILES['productImg']['name'] !== ""){
     $file_name = $_FILES['productImg']['name'];
     $name_parts = explode('.', $file_name);
     $file_extension = end($name_parts);
    $file_extension = strtolower($file_extension);
    $uploadable = str_replace($file_extension, '.webp', $_FILES['productImg']);
    $location = '../../components/images/'.$uploadable['name'];

    $valid_ext = array("webp","jpg","png","jpeg");
    $response = 0;
    if(in_array($file_extension,$valid_ext)){
         if(move_uploaded_file($uploadable['tmp_name'],$location)){
          rename($location, $location = '../../components/images/'.$product_id.'.webp');
          $img_dir = str_replace("../../ ", $_SERVER['HTTP_HOST'], $location);
     } 
    } else {
     die ("notimage");
    };}
    // edit product
    $editQ = ("UPDATE product_stats SET product_name = ?, product_description = ? WHERE product_id = ?");
    $params = array($_POST['productName'], $_POST['productDesc'], $product_id);
    $new_product = $mysqli -> execute_query($editQ, $params);
    //Edit Product Bools
    $bool_list = $mysqli -> query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_bools';");

    
    foreach ($bool_list as $key) {
     if ($key['COLUMN_NAME'] =='product_id' ){
     } else if ($_POST[$key['COLUMN_NAME']] == 'on'){
     $execution = $mysqli -> execute_query("UPDATE product_bools SET ". $key['COLUMN_NAME']. " = true WHERE product_id = ?", array($product_id));
 }  else {
     $execution = $mysqli -> execute_query("UPDATE product_bools SET " . $key['COLUMN_NAME'] ."= false WHERE product_id = ?", array($product_id));
 }
     }
?>