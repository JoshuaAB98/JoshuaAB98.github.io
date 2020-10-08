<?php
session_start();

    include("webpage.php");
    include("functions.php");

    $page = new webpage("Find your location to review!","JoshuaAB", "2020");

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

    <form method="get" action="reviewSearchResults.php">
        <fieldset>
            <label>Please enter a search term:</label>
            <select name="searchterms">
                <option value="region">Region</option>
                <option value="name">Name</option>
                <option value="country">Country</option>
                <option value="type">Type</option>
            </select>
            <input name="searchInput" required/>
            <input type="submit" value="Search" />
        </fieldset>
    </form>


    <br>

    <?php

    $page->close();

?>
