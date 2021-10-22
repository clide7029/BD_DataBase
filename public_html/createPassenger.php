<?php
session_start();
$first = $_POST['first'];
$middle = $_POST['middle'];
$last = $_POST['last'];
$ssn = $_POST['ssn'];
 $errorstring = "";

 if($first == ""){
     $errorstring .= "First_Empty ";
 }
 if($last == ""){
     $errorstring .= "Last_Empty ";
 }
 if($ssn == ""){
     $errorstring .= "SSN_Empty ";
 }
 if($first == NULL){
     $errorstring .= "First_Null ";
 }
 if($last == NULL){
     $errorstring .= "Last_Null ";
 }
 if($ssn == NULL){
     $errorstring .= "SSN_Null ";
 }

 if(!ctype_alpha($first)){
     $errorstring .= "First_Non-Alphabetical ";
 }
 if(!ctype_alpha($last)){
     $errorstring .= "Last_Non-Alphabetical ";
 }
 if(strlen($ssn)!=11){
     $errorstring .= "SSN_Wrong_Length";
 }

 $tempSSN = explode("-",$ssn);
 $tempSSN = implode("", $tempSSN);
 if(!is_numeric($tempSSN)){
     $errorstring .= "SSN_Not_Numeric ";
 }
echo $errorstring;
if($errorstring != ""){
    echo "<script>alert('there was an error')</script>"; //make this send to skyler
    header('Location: ./inputForm.html');
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
 //     $_SESSION['successinsert'] = true;
 //     header('Location: ./showPassengers.php');
 }
 catch(PDOException $e) {
     die('Exception : '.$e->getMessage());
 }
?>
