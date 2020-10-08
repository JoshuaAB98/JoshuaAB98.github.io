<?php
session_start();

    include("webpage.php");
    include("reviewDAO.php");

    $id = htmlentities($_POST["id"]);
    $reviewText = htmlentities($_POST["review"]);

    $page = new webpage("Review Submitted for Approval", "Joshua", "2020");

    $conn = getDatabase();
    $dao = new reviewDAO($conn, "poi_reviews");

    if ($_SESSION["isadmin"] == 1) {
        $page->openAdmin();
        if (!isset ($_SESSION["gatekeeper"])) {
            echo "Not logged in";
            echo "<br>";
        } else {
            echo "Logged in as $_SESSION[gatekeeper] ";
            echo "<br>";
        }
    } else {
        $page->open();
        if (!isset ($_SESSION["gatekeeper"])) {
            echo "Not logged in";
            echo "<br>";
        } else {
            echo "Logged in as $_SESSION[gatekeeper] ";
            echo "<br>";
        }
    }

    try {
        $revObj = new review(null, "$id", "$reviewText");
        $revObj = $dao->saveReview($revObj);

    } catch (PDOException $e) {
        echo "Error: $e";
    }

    echo "<p>The following review has been sent for approval </p>";
    $revObj->display();

    $page->close();

?>
