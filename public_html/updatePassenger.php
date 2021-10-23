<?php
session_start();
$ssn = $_POST['ssn'];
$attribute = $_POST['attribute'];
$value = $_POST['value'];
$first ="";
$middle = "";
$last = "";
$errorstring = "";
if(strlen($ssn)!=11){
    $errorstring .= "SSN_Wrong_Length ";
}

$tempSSN = explode("-",$ssn);
$tempSSN = implode("", $tempSSN);
if(!is_numeric($tempSSN)){
    $errorstring .= "SSN_Not_Numeric ";
}
if($attribute == "f_name"){
    $first =$_POST['value'];
    if($first == ""){
        $errorstring .= "First_Empty ";
    }
    if($first == NULL){
        $errorstring .= "First_Null ";
    }
    if(!ctype_alpha($first)){
        $errorstring .= "First_Non-Alphabetical ";
    }
}
if($attribute == "m_name"){
    $middle =$_POST['value'];
}
if($attribute == "l_name"){
    $last =$_POST['value'];
    if($last == ""){
        $errorstring .= "Last_Empty ";
    }
    if($last == NULL){
        $errorstring .= "Last_Null ";
    }
    if(!ctype_alpha($last)){
        $errorstring .= "Last_Non-Alphabetical ";
    }
}
if($errorstring != ""){
    echo "<script>alert('INVALID FIELDS'.concat(' $errorstring'));
        window.location.href = './inputForm.html';
    </script>"; 
    exit("");

}
$db_file = './myDB/airport.db';
 try {

//     //open connection to the airport database file
     $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

//     //set errormode to use exceptions
     $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //return all passengers, and store the result set
    if($attribute == 'f_name'){
    $stmt = $db -> prepare("update passengers set f_name = (:value) where ssn = (:ssn);");
    $stmt -> bindParam(':value',$_POST['value']);
    $stmt -> bindParam(':ssn', $_POST['ssn']);
    $stmt -> execute();
    }
    else if($attribute == 'm_name'){
        $stmt = $db -> prepare("update passengers set m_name = (:value) where ssn = (:ssn);");
        $stmt -> bindParam(':value',$_POST['value']);
        $stmt -> bindParam(':ssn', $_POST['ssn']);
        $stmt -> execute();
        }
    else if($attribute == 'l_name'){
            $stmt = $db -> prepare("update passengers set l_name = (:value) where ssn = (:ssn);");
            $stmt -> bindParam(':value',$_POST['value']);
            $stmt -> bindParam(':ssn', $_POST['ssn']);
            $stmt -> execute();
            }

    
    echo "success";
    $_SESSION['successupdate'] = true;
    header('Location: ./showPassengers.php');
 }
 catch(PDOException $e) {
     die('Exception : '.$e->getMessage());
 }
?>
