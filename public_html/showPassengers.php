<!DOCTYPE html>
<html>
<body>
<h2>List of all passengers</h2>
<p>
    <?php

        //path to the SQLite database file
        $db_file = './myDB/airport.db';

        try {
            //open connection to the airport database file
            $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

            //set errormode to use exceptions
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            //return all passengers, and store the result set
            $query_str = "select * from passengers;";  // <----- Line 19
            $result_set = $db->query($query_str);

            //loop through each tuple in result set and print out the data
            //ssn will be shown in blue (see below)
            foreach($result_set as $tuple) {          // <------ Line 24
                echo "<font color='blue'>$tuple[ssn]</font> $tuple[f_name] $tuple[m_name] $tuple[l_name]<br/>\n";
            };
            echo "\n";
            session_start();
            if($_SESSION['successinsert']){
                echo "successfully inserted";
                $_SESSION['successinsert'] = false;
            }
            if($_SESSION['successupdate']){
                echo "successfully updated";
                $_SESSION['successupdate'] = false;
            }


            //disconnect from db
            $db = null;
        }
        catch(PDOException $e) {
            die('Exception : '.$e->getMessage());
        }
    ?>

</p>
</body>
</html>