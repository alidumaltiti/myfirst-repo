<?php
session_start(); // Start the session at the very beginning
require_once 'config.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 1. Fetch the user by username first.
  $query = "SELECT * FROM registrations WHERE username = $1";
  $result = pg_query_params($conn, $query, array($username));

  // Add a check to ensure the query was successful before fetching results.
  if ($result && $user = pg_fetch_assoc($result)) {
    // 2. Verify the password against the stored hash.
    if (password_verify($password, $user['password'])) {
      // Password is correct. Store user info in session.
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['username'] = $user['username'];
      
      // Redirect to a member's area dashboard (we'll create this next)
      header("Location: dashboard.php");
      exit();
    }
  }

  // If we reach here, login failed. Redirect back to login with an error.
  header("Location: login.php?error=" . urlencode("Invalid username or password."));
  exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Club Login</title>
  <style>
    body { font-family: Arial; background-color: #f4f4f4; }
    .form-container {
      width: 400px; margin: 50px auto; padding: 20px;
      background: white; border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h2 { text-align: center; color: #333; }
    label { display: block; margin-top: 10px; color: #555; }
    input {
      width: 100%; padding: 8px; margin-top: 5px;
      border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;
    }
    input[type="submit"] {
      margin-top: 15px; background-color: #28a745;
      color: white; border: none; cursor: pointer;
      padding: 10px 15px;
    }
    .register-link {
      text-align: center; margin-top: 15px; display: block;
    }
    .message {
      padding: 10px; border-radius: 4px;
      border: 1px solid transparent; margin-bottom: 15px;
    }
    .error-message {
      background-color: #f8d7da; color: #721c24;
      border-color: #f5c6cb;
    }
    .success-message {
      background-color: #d4edda; color: #155724;
      border-color: #c3e6cb;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>Login to Your Club</h2>
    <?php
      if (isset($_GET['error'])) {
        echo '<div class="message error-message">' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8') . '</div>';
      }
      if (isset($_GET['status']) && $_GET['status'] == 'success') {
        echo '<div class="message success-message">Registration successful! You may now log in.</div>';
      }
    ?>
    <form action="login.php" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>

      <input type="submit" value="Login">
    </form>
    <a href="index.php" class="register-link">Don't have an account? Register</a>
  </div>
</body>
</html>
