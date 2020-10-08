<?php
    include("poiDAO.php");
    $id = htmlentities($_GET["id"]);

    $conn = getDatabase();
    $dao = new poiDAO($conn, "pointsofinterest");

    $poiObj =$dao->findPoiById($id);
    $poiObj->incRecommend();
    $dao->updatePoi($poiObj);

header ("Location: https://edward2.solent.ac.uk/~assign212/searchResults.php?searchterms=id&searchInput=$id");

?>
