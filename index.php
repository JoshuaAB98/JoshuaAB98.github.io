<?php
session_start();

if ($_POST["logoff"] == "true") {

    session_destroy();
    header("Location: index.php");
} else {
    include("webpage.php");
    include("functions.php");

    $page = new webpage("PointsOfInterest!", "JoshuaAB", "2020");
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


    ?>

    <p>Search for places to see and things to do. Use our users' rating to determine your next trip with your family,
        friends or by your lonesome. Add places of interest, recommend your favourites and review to let other people
        know why you love the places you do.</p>

    <form method="get" action="searchResults.php">
        <fieldset>
            <label>Search for places to visit here:</label>
            <select name="searchterms">
                <option value="region">Region</option>
                <option value="country">Country</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
            </select>
            <input name="searchInput" required/>
            <input type="submit" value="Search"/>
        </fieldset>
    </form>

    <br>

    <?php
    if (isset ($_SESSION["gatekeeper"])) {
        ?>
        <form method="POST" action="index.php">
            <input type='hidden' name='logoff' value='true'/>
            <input type="submit" value="Sign Out!"/>
        </form>
        <?php
    }
    ?>


    <br>

    <?php

    $page->close();
}

?>
