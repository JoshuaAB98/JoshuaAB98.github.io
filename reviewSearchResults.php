<?php
session_start();


    include("webpage.php");
    include("poiDAO.php");

    $page = new webpage("Review Search Results", "Joshua", "2020");

    $conn = getDatabase();
    $dao = new poiDAO($conn, "pointsofinterest");

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
        $searchInput = htmlentities($_GET["searchInput"]);
        $searchterms = htmlentities($_GET["searchterms"]);

        $pois = $dao->findByX($searchterms, $searchInput);

        foreach ($pois as $poi) {
            $poi->display();
            echo "<a href='submitReview.php?id=" . $poi->getId() . "'>Review "  . $poi->getName() . "</a>";
        }

    } catch (PDOException $e) {
        echo "Error: $e";
    }

    ?>
    <br>
    <?php
    $page->close();

?>
