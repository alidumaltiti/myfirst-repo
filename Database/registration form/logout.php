<?php
session_start(); // Resume the session

// Unset all of the session variables.
$_SESSION = [];

// Destroy the session.
session_destroy();

// Redirect to the login page with a confirmation message.
header("Location: login.php");
exit();
?>