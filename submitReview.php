<?php
session_start();

    include("webpage.php");
    include("reviewDAO.php");

    $page = new webpage("Submit Review", "Joshua", "2020");

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

    $id = htmlentities($_GET["id"]);

    try{
        ?>
        <form method="post" action="reviewConf.php">
            <label>Review: </label>
            <textarea name="review" rows="5" cols="40"></textarea><br>
            <?php
            echo "<input name='id' type='hidden' value=$id>";
            ?>
            <input type="submit" value="Submit Review!" />
        </form>
    <?php
    }
    catch (PDOException $e) {
        echo "Error: $e";
    }

    ?>
    <br>
    <?php
    $page->close();

?>
