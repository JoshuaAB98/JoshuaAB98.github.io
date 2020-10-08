<?php
include("functions.php");
include("webpage.php");

$page = new webpage("Login", "Joshua", "2020");
$page->open();
?>
<form method="post" action="loginConf.php">
    <label for="username">Username:</label>
    <input name="username" id="username" required/>
    <br/>
    <label for="password" required>Password:</label>
    <input name="password" id="password" type="password" required/>
    <br/>
    <input type="submit" value="Submit"/>
</form>
<?php
$page->close();

?>
