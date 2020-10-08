<?php
session_start();
    include("webpage.php");
    include("reviewDAO.php");

    $page = new webpage("View Reviews", "Joshua", "2020");

    $conn = getDatabase();
    $dao = new reviewDAO($conn, "poi_reviews");

if($_SESSION["isadmin"] == 1){
    $page->openAdmin();
    if(!isset ($_SESSION["gatekeeper"])){
        echo "Not logged in";
        echo"<br>";
    }
    else{
        echo "Logged in as $_SESSION[gatekeeper] ";
        echo"<br>";
    }
}
else{
    $page->open();
    if(!isset ($_SESSION["gatekeeper"])){
        echo "Not logged in";
        echo"<br>";
    }
    else{
        echo "Logged in as $_SESSION[gatekeeper] ";
        echo"<br>";
    }
}

    try {
        $poi_id = htmlentities($_GET["id"]);

        $reviews = $dao->findReviewByApproved($poi_id);

        if(sizeof($reviews) != 0){
          foreach ($reviews as $review) {
            $review->display();
          }
        }
        else{
          echo "<br>There are currently no reviews for this point of interest. Click below to review.<br>";
          echo "<a href='submitReview.php?id=" . $poi_id . "'>Review </a>";
        }

    } catch (PDOException $e) {
        echo "Error: $e";
    }

    ?>
    <br>
    <?php
    $page->close();

?>
