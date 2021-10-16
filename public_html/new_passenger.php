<?php

$first = $_POST['first'];
$middle = $_POST['middle'];
$last = $_POST['last'];
$ssn = $_POST['ssn'];
if($first = ""){
    ?>
    <form action="./nameoffile" method="POST">
        Name: <input type="text" name="Firstempty" value="First name was empty" />
    <input type="submit" />
    <?php
    //remember to put in the proper direct once andrew and skyler make it
}
if($middle = ""){
    ?>
    <form action="./nameoffile" method="POST">
        Name: <input type="text" name="Middleempty" value="Middle name was empty" />
    <input type="submit" />
    <?php
    //remember to put in the proper direct once andrew and skyler make it
}
if($last = ""){
    ?>
    <form action="./nameoffile" method="POST">
        Name: <input type="text" name="Lastempty" value="Last name was empty" />
    <input type="submit" />
    <?php
    //remember to put in the proper direct once andrew and skyler make it
}
if($ssn = ""){
    ?>
    <form action="./nameoffile" method="POST">
        Name: <input type="text" name="SSNempty" value="SSN was empty" />
    <input type="submit" />
    <?php
    //remember to put in the proper direct once andrew and skyler make it
}
$db_file = './myDB/airport.db';
try {

    //open connection to the airport database file
    $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

    //set errormode to use exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //return all passengers, and store the result set
    $query_str = "insert into passengers values" first middle last ssn";";  // <----- Line 19
    $result_set = $db->query($query_str);
}
catch(PDOException $e) {
    die('Exception : '.$e->getMessage());
}