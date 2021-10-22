<?php
$ssn = $_POST['ssn'];
$attribute = $_POST['attribute'];
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
if($attribute == "first"){
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
if($attribute == "middle"){
    $middle =$_POST['value'];
}
if($attribute == "last"){
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
    //header('Location: ./inputForm.html');
    echo "<script>alert('INVALID FIELDS'.concat(' $errorstring'));
        window.location.href = './inputForm.html';
    </script>"; //make this send to skyler
    //echo '<script type="text/JavaScript"> prompt("GeeksForGeeks");</script>';
    //exit("");
    exit("");

}
$db_file = './myDB/airport.db';
 try {

//     //open connection to the airport database file
     $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

//     //set errormode to use exceptions
     $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //return all passengers, and store the result set
    if($attribute == "first"){
     $stmt = $db -> prepare("update passengers set f_name = (?);");  // <----- Line 19
     $stmt-> execute([$_POST['first']);
    }
    if($attribute == "middle"){
        $stmt = $db -> prepare("update passengers set m_name = (?);");  // <----- Line 19
        $stmt-> execute([$_POST['middle']);
       }
    if($attribute == "last"){
        $stmt = $db -> prepare("update passengers set l_name = (?);");  // <----- Line 19
        $stmt-> execute([$_POST['last']);
    }
    echo "success";
      $_SESSION['successinsert'] = true;
      header('Location: ./showPassengers.php');
 }
 catch(PDOException $e) {
     die('Exception : '.$e->getMessage());
 }
?>
