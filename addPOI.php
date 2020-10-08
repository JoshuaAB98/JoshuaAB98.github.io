<?php
session_start();
// Test that the authentication session variable exists
if (!isset ($_SESSION["gatekeeper"])) {
    header("Location: login.php");
} else {
    include("webpage.php");
    include("functions.php");

    $page = new webpage("Add a Point of Interest!", "JoshuaAB", "2020");

    if($_SESSION["isadmin"] == 1){
        $page->openAdmin();
    }
    else{
        $page->open();
    }
    echo "Logged in as $_SESSION[gatekeeper] ";
    echo "<br>";
    ?>

    <form method="post" action="poiConf.php">
        <fieldset>
            <label>Name: </label>
            <input name="name" required/><br>
            <label>location type: </label>
            <select name="type">
                <option value="City">City</option>
                <option value="Historical Building">Historical Building</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Other">Other</option>
            </select><br>
            <label>Country: </label>
            <input name="country" required/><br>
            <label>Region: </label>
            <input name="region" required/><br>
            <label>Longitude (180 and -180): </label>
            <input name="lon" required/><br>
            <label>Latitude (90 and -90): </label>
            <input name="lat" required/><br>
            <label>Description: </label>
            <textarea name="description" rows="5" cols="40"></textarea><br>
            <?php
            echo "<input type='hidden' name='username' value='$_SESSION[gatekeeper]'/><br>"
            ?>

            <input type="submit" value="Submit Point of Interest"/>
        </fieldset>
    </form>

    <br>
    <?php

    $page->close();

}
?>
