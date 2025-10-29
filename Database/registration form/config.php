<?php

$host = 'localhost';
$dbname = 'registration'; // As defined in your setup.sql
$user = 'postgres';
// For production, it's highly recommended to use environment variables
// instead of hard-coding passwords in the source code.
$password = '1234'; // Your actual development password

$conn_string = "host={$host} dbname={$dbname} user={$user} password={$password} options='--client_encoding=UTF8'";
$conn = pg_connect($conn_string);

if (!$conn) {
    // Log the detailed error from the last connection attempt.
    error_log("Database connection failed: " . pg_last_error()); // No connection resource needed here
    // Show a generic, user-friendly message and stop execution.
    die("Sorry, we're experiencing technical difficulties. Please try again later.");
}