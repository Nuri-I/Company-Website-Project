<?php 

     $error = "";
     if ($_FILES['productImg']['name'] == ""){
          $error .= "img";
     }
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
     //upload file 
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
    };
     // Register product
     $insertQ = ("INSERT INTO product_stats (product_id, product_name, product_description, product_image_url) VALUES(?,?,?,?)");
     $params = array($product_id, $_POST['productName'], $_POST['productDesc'], $img_dir);
     $new_product = $mysqli -> execute_query($insertQ, $params);
     unset($_POST['productName'],$_POST['productDesc'], $_POST['productId']);
     //Edit Product Bools
     
     $insertQ = ("INSERT INTO product_bools (product_id) VALUES(?)");
     $params = array($product_id);
     $new_product = $mysqli -> execute_query($insertQ, $params);

     $bools = array_keys($_POST);
     foreach ($bools as $key) {
          $execution = $mysqli -> execute_query("UPDATE product_bools SET $key = true WHERE product_id = ?", array($product_id));

     }
     echo (json_encode($_POST));
?>