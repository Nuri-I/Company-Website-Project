<?php
include_once "../../components/backend/connectDB.php";
$cols = $mysqli->query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'company_website' AND TABLE_NAME = 'product_bools'");
$col_count = $cols->num_rows;

$column_names = array();
for ($i = 0; $i < ceil($col_count / 4); $i++) {
    @$output .= "<div class = 'flexRow'>";
    for ($k = $i; $k < $i + 4; $k++) {
        $stored = $cols->fetch_assoc();
        if (@$stored["COLUMN_NAME"] == "") {
            $i = ceil($col_count / 4);
            $k = $i + 4;
        } else {
            $choice = $stored["COLUMN_NAME"];
            $new_box = "<div class = 'checkbox'> <label for = '{$choice}'>{$choice}</label> <input type = 'checkbox' id='{$choice}' name='{$choice}' value = 'on'> </div>";
            if ($choice != "product_id") {
                @$output .= $new_box;
            } else {
                $k -=  1;
            }
        }
    }
    @$output .= "</div>";
}
echo $output;
?>