<?php

session_start(); // Start the session to store form data
require_once 'config.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Validate and sanitize inputs
  $full_name = trim($_POST['full_name'] ?? '');
  $username = trim($_POST['username'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? ''; // Keep raw password for hashing
  $phone_number = trim($_POST['phone_number'] ?? '');
  $gender = trim($_POST['gender'] ?? '');
  $program = trim($_POST['program'] ?? '');

  // Basic server-side validation for required fields
  if (empty($full_name) || empty($username) || empty($email) || empty($password)) {
      $_SESSION['form_data'] = $_POST; // Store data even if basic validation fails
      $error_message = "Please fill in all required fields (Full Name, Username, Email, Password).";
      header("Location: index.php?error=" . urlencode($error_message));
      exit();
  }

  // Hash the password for secure storage.
  $password_hash = password_hash($password, PASSWORD_DEFAULT);
  if ($password_hash === false) {
      // This is a rare error, but good to catch defensively.
      error_log("Password hashing failed for user: " . $username);
      $_SESSION['form_data'] = $_POST; // Store data for repopulation
      $error_message = "An unexpected error occurred during password processing. Please try again.";
      header("Location: index.php?error=" . urlencode($error_message));
      exit();
  }

  // 1. Check if username already exists
  $query_user = "SELECT id FROM registrations WHERE username = $1";
  $result_user = pg_query_params($conn, $query_user, array($username));

  if ($result_user === false) {
    // The query itself failed. Log the real error and show a generic message.
    error_log("Registration Error (username check): " . pg_last_error($conn));
    $_SESSION['form_data'] = $_POST; // Store data for repopulation
    $error_message = "An unexpected error occurred. Please try again.";
    header("Location: index.php?error=" . urlencode($error_message));
    exit();
  }
  if (pg_num_rows($result_user) > 0) {
    $error_message = "Username is already taken. Please choose another.";
    $_SESSION['form_data'] = $_POST; // Store data for repopulation
    header("Location: index.php?error=" . urlencode($error_message));
    exit();
  }

  // 2. Check if email already exists
  $query_email = "SELECT id FROM registrations WHERE email = $1";
  $result_email = pg_query_params($conn, $query_email, array($email));

  if ($result_email === false) {
    // The query itself failed. Log the real error and show a generic message.
    error_log("Registration Error (email check): " . pg_last_error($conn));
    $_SESSION['form_data'] = $_POST; // Store data for repopulation
    $error_message = "An unexpected error occurred. Please try again.";
    header("Location: index.php?error=" . urlencode($error_message));
    exit();
  }
  if (pg_num_rows($result_email) > 0) {
    $error_message = "This email address is already registered. Please use another.";
    $_SESSION['form_data'] = $_POST; // Store data for repopulation
    header("Location: index.php?error=" . urlencode($error_message));
    exit();
  }

  // 3. If both are unique, proceed with insertion
  $query = "INSERT INTO registrations (full_name, username, email, password, phone_number, gender, program)
            VALUES ($1, $2, $3, $4, $5, $6, $7)";
  // Store the hashed password, not the plain text one.
  $result = pg_query_params($conn, $query, array($full_name, $username, $email, $password_hash, $phone_number, $gender, $program));

  if ($result) {
    // Redirect to the correct login page (login.php) on success
    unset($_SESSION['form_data']); // Clear form data on success
    header("Location: login.php?status=success");
    exit();
  } else {
    // Show a generic error to the user. Log the specific error for debugging.
    error_log("Registration Error (INSERT): " . pg_last_error($conn)); // More specific log message
    $_SESSION['form_data'] = $_POST; // Store data for repopulation
    $error_message = "An unexpected error occurred during registration. Please try again.";
    header("Location: index.php?error=" . urlencode($error_message));
    exit();
  }
}
?>
