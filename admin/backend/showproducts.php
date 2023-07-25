<?php 
include_once "../../components/backend/connectDB.php";
$cols = $mysqli -> query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_stats'");
$col_count = $cols -> num_rows; 

$column_names = array();
$output = "<tr>";
for ($i=0; $i < $col_count; $i++) { 
    $stored = $cols -> fetch_assoc();
    $choice = $stored["COLUMN_NAME"];
    array_push($column_names, $choice);
    $output .= "<th>$choice</th>";
}
$output .= "</tr>";

$rows = $mysqli -> query("SELECT * FROM product_stats");
$row_count = $rows -> num_rows;
for ($i=0; $i < $row_count; $i++) {
    $output .= "<tr>" ;
    $stored = $rows -> fetch_assoc();
    for ($k=0; $k < $col_count; $k++) { 
       
        if ($column_names[$k] == "product_image_url" ) {
            $item = "<img src = '{$stored[$column_names[$k]]}' style= 'height: 200px;'>";
        } else {
        $item = $stored[$column_names[$k]]; }
        $output .= "<td>$item</td>";
    }
    $output .= "<td> <button type='button' id='{$stored[$column_names[0]]}'> <img src='../components/images/edit.svg' alt= 'edit'></button>  </td>";
    $output .= "</tr>";
    
}
echo $output;
?>