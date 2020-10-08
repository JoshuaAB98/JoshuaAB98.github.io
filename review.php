<?php


class review
{
//Attributes
    private $id, $poi_id, $reviewText;

    // methods
    function __construct($idIn, $poi_idIn, $reviewTextIn)
    {
        $this->id=$idIn;
        $this->poi_id=$poi_idIn;
        $this->reviewText=$reviewTextIn;
    }

    function display()
    {
        echo "<p>";
        echo "ID: ". $this->id ."<br>";
        echo "Poi ID: ". $this->poi_id ."<br>";
        echo "Review: ". $this->reviewText ."<br>";
        echo "<p/>";
    }

    function getId(){
        return $this->id;
    }

    function getPoiId(){
        return $this->poi_id;
    }

    function getReviewText(){
        return $this->reviewText;
    }

    function setId($idIn){
        $this->id=$idIn;
    }

    function setPoiId($poiIdIn){
        $this->poi_id=$poiIdIn;
    }

    function setReviewText($reviewTextIn){
        $this->reviewText=$reviewTextIn;
    }
}

?>
