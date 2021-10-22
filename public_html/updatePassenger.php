<?php
$ssn = $_POST['ssn'];
$attribute = $_POST['attribute'];
$first ="";
$middle = "";
$last = "";

if($attribute == "first"){
    $first =$_POST['value'];
}
if($attribute == "middle"){
    $middle =$_POST['value'];
}
if($attribute == "last"){
    $last =$_POST['value'];
}

$db_file = './myDB/airport.db';
try {

    //open connection to the airport database file
    $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

    //set errormode to use exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //return all passengers, and store the result set
    $stmt = $db -> prepare("update passengers set (first) values (:first, :middle, :last, :ssn);");  // <----- Line 19
    $stmt->bindParam(':first', $first);
    $stmt->bindParam(':middle', $middle);
    $stmt->bindParam(':last', $last);
    $stmt->bindParam(':ssn', $ssn);
    execute($stmt);
    $_SESSION['successinsert'] = true;
    header('Location: ./showPassenger.php');
}
catch(PDOException $e) {
    die('Exception : '.$e->getMessage());
}

?>
