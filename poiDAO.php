<?php
include("poi.php");
include("functions.php");
class poiDAO{

private $table, $conn;

    public function __construct($conn, $t)
    {
        $this->conn = $conn;
        $this->table = $t;
    }

    function findPoiById($idIn)
    {
        $query = $this->conn->prepare("SELECT * FROM ".  $this->table .  " WHERE ID=?");
        $query->execute([$idIn]);
        $row = $query->fetch();
        $poi = new poi($row["ID"], $row["name"], $row["type"], $row["country"], $row["region"], $row["lon"], $row["lat"], $row["description"], $row["recommended"], $row["username"]);
        return $poi;
    }

    public function findByX($searchTerm, $searchInput)
    {
        $query = $this->conn->prepare("SELECT * FROM ".  $this->table .  " WHERE $searchTerm=?");
        $query->execute([$searchInput]);
        $pois = [];
        while($row = $query->fetch()) {
        $poi = new poi($row["ID"], $row["name"], $row["type"], $row["country"], $row["region"], $row["lon"], $row["lat"], $row["description"], $row["recommended"], $row["username"]);
        $pois[] = $poi;
        }
        return $pois;
    }

    public function updatePoi(poi $poiObj)
    {
        $query = $this->conn->prepare("UPDATE " . $this->table .  " SET recommended=? WHERE ID=?");
        $query->execute([$poiObj->getRecommended(), $poiObj->getId()]);
    }

    public function savePoi(poi $poiObj)
    {
        $query = $this->conn->prepare("INSERT INTO " . $this->table .  "(name, type, country, region, lon, lat, description, recommended, username) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)");
        $query->execute([$poiObj->getName(), $poiObj->getType(), $poiObj->getCountry(), $poiObj->getRegion(), $poiObj->getLon(), $poiObj->getLat(), $poiObj->getDescription(), $poiObj->getUsername()]);
        $id = $this->conn->lastInsertId();
        $poiObj->setId($id);
        return $poiObj;
    }

}
?>
