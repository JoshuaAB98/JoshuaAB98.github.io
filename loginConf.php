<?php

    session_start();

    include("functions.php");
    $conn = getDatabase();

    $username = htmlentities($_POST["username"]);
    $password = htmlentities($_POST["password"]);

    $results = $conn->prepare("SELECT * FROM poi_users WHERE username =:username and password =:password ");
    $results->execute([":username"=>$username, ":password"=>$password]);
    $row=$results->fetch(PDO::FETCH_ASSOC);

    if ($results->rowCount()==0) {
        echo "No records found!";
    }

    else if($results->rowCount()==1){
        $_SESSION["gatekeeper"] = $row["username"];
        if($row["isadmin"] == 1){
          $_SESSION["isadmin"] = 1;
        }
        else{
          $_SESSION["isadmin"] = 0;
        }
        header ("Location: index.php");
    }
    else{
        echo "Too many records found!";
    }

?>
