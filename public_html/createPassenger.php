<?php
session_start();
$first = $_POST['first'];
$middle = $_POST['middle'];
$last = $_POST['last'];
$ssn = $_POST['ssn'];
 $errorstring = "";

 if($first == ""){
     $errorstring .= "First_Empty\n";
 }
 if($last == ""){
     $errorstring .= "Last_Empty\n";
 }
 if($ssn == ""){
     $errorstring .= "SSN_Empty\n";
 }
 if($first == NULL){
     $errorstring .= "First_Null\n";
 }
 if($last == NULL){
     $errorstring .= "Last_Null\n";
 }
 if($ssn == NULL){
     $errorstring .= "SSN_Null\n";
 }

 if(!ctype_alpha($first)){
     $errorstring .= "First_Non-Alphabetical\n";
 }
 if(!ctype_alpha($last)){
     $errorstring .= "Last_Non-Alphabetical\n";
 }
 if(strlen($ssn)!=11){
     $errorstring .= "SSN_Wrong_Length\n";
 }

 $tempSSN = explode("-",$ssn);
 $tempSSN = implode("", $tempSSN);
 if(!is_numeric($tempSSN)){
     $errorstring .= "SSN_Not_Numeric ";
 }
echo $errorstring;
if($errorstring != ""){
    //header('Location: ./inputForm.html');
    echo "<script>alert('INVALID FIELDS: '.concat('$errorstring'));
        window.location.href = './inputForm.html';
    </script>"; //make this send to skyler
    //echo '<script type="text/JavaScript"> prompt("GeeksForGeeks");</script>';
    //exit("");
    exit("");

}

echo "im fucking done";

 $db_file = './myDB/airport.db';
 try {

//     //open connection to the airport database file
     $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

//     //set errormode to use exceptions
     $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //return all passengers, and store the result set
     $stmt = $db -> prepare("insert into passengers values (?, ?, ?, ?);");  // <----- Line 19
     $stmt-> execute([$_POST['first'],$_POST['middle'],$_POST['last'],$_POST['ssn']]);

    echo "success";
      $_SESSION['successinsert'] = true;
      header('Location: ./showPassengers.php');
 }
 catch(PDOException $e) {
     die('Exception : '.$e->getMessage());
 }
?>
