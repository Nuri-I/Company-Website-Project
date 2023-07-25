<?php 


if(isset($_FILES['productImg']['name'])){
    // file name

    $filename = $_FILES['productImg']['name'];
 
    // Location
    $location = '../../components/images/'.$filename;
 
    // file extension
    $file_extension = pathinfo($location, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);
 
    // Valid extensions
    $valid_ext = array("webp","jpg","png","jpeg");

    $response = 0;
    if(in_array($file_extension,$valid_ext)){
         // Upload file
         if(move_uploaded_file($_FILES['productImg']['tmp_name'],$location)){
              $response = 1;
         } 
    }
 
    echo $response;
    exit;
 } 
 echo json_encode($_FILES);


?>