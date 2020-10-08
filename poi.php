<?php

class poi
{

    //Attributes
    private $id, $name, $type, $country, $region, $longitude, $latitude, $description, $recommended, $username;

    // methods
    function __construct($idIn, $nameIn, $typeIn, $countryIn, $regionIn, $lonIn, $latIn, $descIn, $recIn ,$unIn)
    {
        $this->id=$idIn;
        $this->name=$nameIn;
        $this->type=$typeIn;
        $this->country=$countryIn;
        $this->region=$regionIn;
        $this->longitude=$lonIn;
        $this->latitude=$latIn;
        $this->description=$descIn;
        $this->recommended=$recIn;
        $this->username=$unIn;
    }

    function display()
    {
        echo "<p>";
        echo "ID: ". $this->id ."<br>";
        echo "Location Name: ". $this->name ."<br>";
        echo "Location Type: ". $this->type ."<br>";
        echo "Country: ". $this->country ."<br>";
        echo "Region: ". $this->region ."<br>";
        echo "Longitude: ". $this->longitude ."<br>";
        echo "Latitude: ". $this->latitude ."<br>";
        echo "Description: ". $this->description ."<br>";
        echo "Recommended: ". $this->recommended ."<br>";
        echo "Username: ". $this->username ."<br>";
        echo "<p/>";
    }

    function setId($idIn){
        $this->id=$idIn;
    }

    function incRecommend(){
        $this->recommended += 1;
    }

    function getId(){
        return $this->id;
    }

    function getName(){
        return $this->name;
    }

    function getType(){
        return $this->type;
    }

    function getCountry(){
        return $this->country;
    }

    function getRegion(){
        return $this->region;
    }

    function getLon(){
        return $this->longitude;
    }

    function getLat(){
        return $this->latitude;
    }

    function getDescription(){
        return $this->description;
    }

    function getRecommended(){
        return $this->recommended;
    }

    function getUsername(){
        return $this->username;
    }

}
?>
