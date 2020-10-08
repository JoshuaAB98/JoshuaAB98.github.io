<?php
include("review.php");
include("functions.php");
class reviewDAO
{
    private $table, $conn;

    public function __construct($conn, $t) {
        $this->conn = $conn;
        $this->table = $t;
    }

    public function saveReview(review $reviewObj) {
        $query = $this->conn->prepare("INSERT INTO " . $this->table .  " (poi_id, review, approved) VALUES (?, ?, 0)");
        $query->execute([$reviewObj->getPoiId(), $reviewObj->getReviewText()]);
        $last_id_query = $this->conn->prepare("SELECT LAST_INSERT_ID()");
        $last_id_query->execute();
        $row = $last_id_query->fetch();
        $reviewObj->setId($row["LAST_INSERT_ID()"]);

        return $reviewObj;
    }

    function findReviewById($idIn){
        $query = $this->conn->prepare("SELECT * FROM ".  $this->table .  " WHERE ID=?");
        $query->execute([$idIn]);
        $row = $query->fetch();
        $review = new review($row["id"], $row["poi_id"], $row["review"]);
        return $review;
    }

    function findReviewByApproved($idIn){
        $query = $this->conn->prepare("SELECT * FROM ".  $this->table .  " WHERE poi_id=? AND approved=1");
        $query->execute([$idIn]);
        $reviews = [];
        while($row = $query->fetch()) {
            $review = new review($row["id"], $row["poi_id"], $row["review"]);
            $reviews[] = $review;
        }
        return $reviews;
    }

    function findReviewByNeedsApproval(){
        $query = $this->conn->prepare("SELECT * FROM ".  $this->table .  " WHERE approved=0 ORDER BY id DESC");
        $query->execute();
        $reviews = [];
        while($row = $query->fetch()) {
            $review = new review($row["id"], $row["poi_id"], $row["review"]);
            $reviews[] = $review;
        }
        return $reviews;
    }

    public function approveReview($idIn) {
        $query = $this->conn->prepare("UPDATE " . $this->table .  " SET approved=1 WHERE ID=?");
        $query->execute([$idIn]);
    }
}

?>
