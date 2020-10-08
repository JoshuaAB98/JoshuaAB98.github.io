<?php

function getLinks(){

    $links = array("Home"=>"index.php", "Log in"=>"login.php", "Add a Poi"=>"addPOI.php", "Review a Poi"=>"findReviewPoi.php");

    echo "<div class=\"sidenav\">";
    foreach($links as $link => $linkValue){
        echo"<a href ='https://edward2.solent.ac.uk/~assign212/$linkValue'>$link</a><br>";
    }
    echo "</div>";
}

function getAdminLinks(){

    $links = array("Home"=>"index.php", "Log in"=>"login.php", "Add a Poi"=>"addPOI.php", "Review a Poi"=>"findReviewPoi.php", "Reviews to Approve"=>"approveReview.php");

    echo "<div class=\"sidenav\">";
    foreach($links as $link => $linkValue){
        echo"<a href ='https://edward2.solent.ac.uk/~assign212/$linkValue'>$link</a><br>";
    }
    echo "</div>";
}

function getDatabase(){
    $conn = new PDO ("mysql:host=localhost;dbname=assign212;", "assign212", "ohgaerup");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
}

?>
