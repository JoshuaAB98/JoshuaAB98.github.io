<?php
if (!isset ($_SESSION["gatekeeper"])) {
    header("Location: login.php");
}elseif($_SESSION["isadmin"] != 1){
    header("Location: index.php");
}
include("reviewDAO.php");

$conn = getDatabase();
$dao = new reviewDAO($conn, "poi_reviews");

$id = htmlentities($_GET["id"]);

$dao->approveReview($id);

header ("Location: approveReview.php");

?>
