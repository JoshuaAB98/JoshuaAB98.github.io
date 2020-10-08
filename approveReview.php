<?php
session_start();
// Test that the authentication session variable exists
if (!isset ($_SESSION["gatekeeper"])) {
    header("Location: login.php");
} else {

    include("webpage.php");
    include("reviewDAO.php");

    $page = new webpage("View Reviews", "Joshua", "2020");

    $conn = getDatabase();
    $dao = new reviewDAO($conn, "poi_reviews");

    if($_SESSION["isadmin"] == 1){
        $page->openAdmin();
    }
    else{
        header("Location: index.php");
    }

    echo "Logged in as $_SESSION[gatekeeper] <br>";
    echo "<br>";

    try {
        $reviews = $dao->findReviewByNeedsApproval();

        foreach ($reviews as $review) {
            $review->display();
            echo "<a href='approveReviewScript.php?id=" . $review->getId() . "'>Approve Review</a>";
        }

    } catch (PDOException $e) {
        echo "Error: $e";
    }

    ?>
    <br>
    <?php
    $page->close();
}
?>
