<?php

class webpage
{
    //Attributes
    private $title, $author, $year;

    // methods
    function __construct($titleIn, $authorIn, $yearIn)
    {
        $this->title = $titleIn;
        $this->author = $authorIn;
        $this->year = $yearIn;
    }

    function open()
    {
        echo "<!DOCTYPE html>";
        echo "<html>";
        echo "<head>";
        echo "<title>$this->title</title>";
        echo "<link rel='stylesheet' href='styles.css'>";
        echo "</head>";
        echo "<body>";
        echo getLinks();
        echo "<div class='main'>";
        echo "<h1>$this->title</h1>";
    }

    function openAdmin()
    {
        echo "<!DOCTYPE html>";
        echo "<html>";
        echo "<head>";
        echo "<title>$this->title</title>";
        echo "<link rel='stylesheet' href='styles.css'>";
        echo "</head>";
        echo "<body>";
        echo getAdminLinks();
        echo "<div class='main'>";
        echo "<h1>$this->title</h1>";
    }

    function close()
    {
        echo "<br>";
        echo "<footer><div>This website copyright (c) $this->author $this->year</div></footer>";
        echo "</div>";
        echo "</body>";
        echo "</html>";
    }
}

?>
