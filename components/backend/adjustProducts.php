
<?php 
include 'connectDB.php';
$_POST = json_decode(file_get_contents("php://input"), true);
$adjusting = @$_POST['adjusting'];
$x = 0;
if ($adjusting == "product_id") {
  exit();
}
$productBools = $mysqli -> query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_bools'");
$col_count = $productBools -> num_rows;


for ($i=0; $i < $col_count; $i++) { 
  $stored = $productBools -> fetch_assoc();
  $choice = $stored["COLUMN_NAME"];
  
  if ($choice == @$adjusting){
    $x = 1;
    $i = $col_count;
  };
}
if ($x != 1){
  exit();
}

$rows = $mysqli -> query("SELECT 'product_id', product_image_url, product_name, product_description FROM company_website.product_stats JOIN company_website.product_bools ON company_website.product_bools.product_id = company_website.product_stats.product_id WHERE $adjusting = 1;");
$row_count = $rows -> num_rows;
$output = array();
for ($i=0; $i < $row_count; $i++) { 
    $stored = $rows -> fetch_assoc();
    $id = strval($stored["product_id"]);
    $url = $stored["product_image_url"];
    $name = $stored["product_name"];
    $desc = $stored["product_description"];
    array_push($output, " 
    <article class='card w-90-on-mobile'>
    <img class='card-img-top' src='$url' alt='$name' id='$id'>
    <div class='card-body'>
      <h4 class='card-title'>$name</h4>
      <p class='card-text'>$desc</p>
    </div>
  </article>");
}
echo json_encode($output);
?>