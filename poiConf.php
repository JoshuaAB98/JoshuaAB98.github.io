<?php
session_start();
// Test that the authentication session variable exists
if (!isset ($_SESSION["gatekeeper"])) {
    header("Location: login.php");
} else {
    include("webpage.php");
    include("poiDAO.php");
    $conn = getDatabase();

    $page = new webpage("Point of Interest Confirmation Page", "Joshua", "2020");

    $dao = new poiDAO($conn, "pointsofinterest");

    if($_SESSION["isadmin"] == 1){
        $page->openAdmin();
          echo "Logged in as $_SESSION[gatekeeper] ";
          echo"<br>";
    }
    else{
        $page->open();
          echo "Logged in as $_SESSION[gatekeeper] ";
          echo"<br>";
        }

    try {
        $name = htmlentities($_POST["name"]);
        $type = htmlentities($_POST["type"]);
        $country = htmlentities($_POST["country"]);
        $region = htmlentities($_POST["region"]);
        $lon = htmlentities($_POST["lon"]);
        $lat = htmlentities($_POST["lat"]);
        $description = htmlentities($_POST["description"]);
        $username = htmlentities($_POST["username"]);

        if($lon<181 && $lon>-181){
            if($lat<91 && $lat>-91){
                $poiIn = new poi(null, "$name", "$type", "$country", "$region", "$lon", "$lat", "$description", "0", "$username");

                $poiIn = $dao->savePoi($poiIn);
                $fetchedPoi = $dao->findPoiById($poiIn->getId());

                $fetchedPoi->display();
                echo "<a href='recommendPoiScript.php?id=" . $poiIn->getId() . "'>Recommend "  . $poiIn->getName() . "</a>";

            }
            else{
                Echo"<p>Latitude is not between 90 and -90";
            }
        }
        else{
            if($lat>90 || $lat<-90){
              Echo"<p>Longitude is not between 180 and -180";
              Echo"<p>Latitude is not between 90 and -90";
            }
            else{
              Echo"<p>Longitude is not between 180 and -180";
            }
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
