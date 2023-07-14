<?php 
include 'connectDB.php';
$rows = $mysqli -> query("SELECT count(*) FROM product_stats");
$row_arr = $rows -> fetch_array();
$row_count = $row_arr["count(*)"];

$search = $mysqli -> query("SELECT * FROM product_stats");

$output = array();
for ($i=0; $i < $row_count; $i++) { 
    # code...
    $stored = $search -> fetch_assoc();
    $url = $stored["product_image_url"];
    $name = $stored["product_name"];
    $desc = $stored["product_description"];
    array_push($output, " <article class='card w-90-on-mobile'>
    <img class='card-img-top' src='$url' alt='$name'>
    <div class='card-body'>
      <h4 class='card-title'>$name</h4>
      <p class='card-text'>$desc</p>
    </div>
  </article>");
}
echo json_encode($output);
?>