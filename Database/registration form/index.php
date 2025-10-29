<?php
session_start(); // Start session to access form data
$form_data = $_SESSION['form_data'] ?? []; // Get form data if it exists
unset($_SESSION['form_data']); // Clear it so it's not reused accidentally
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Club Registration</title>
  <style>
    body { font-family: Arial; background-color: #f4f4f4; }
    .form-container {
      width: 400px; margin: 50px auto; padding: 20px;
      background: white; border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h2 { text-align: center; color: #333; }
    label { display: block; margin-top: 10px; color: #555; }
    input, select {
      width: 100%; padding: 8px; margin-top: 5px;
      border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;
    }
    input[type="submit"] {
      margin-top: 15px; background-color: #32a007;
      color: white; border: none; cursor: pointer;
      padding: 10px 15px;
    }
    .login-link {
      text-align: center; margin-top: 15px; display: block;
    }
    .error-message {
      background-color: #f8d7da; color: #721c24;
      padding: 10px; border-radius: 4px;
      border: 1px solid #f5c6cb; margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>Register for Your Club</h2>
    <?php
      if (isset($_GET['error'])) {
        echo '<div class="error-message">' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8') . '</div>';
      }
    ?>
     <form action="register.php" method="POST" novalidate>
      <label for="full_name">Full Name:</label>
      <input type="text" id="full_name" name="full_name" required value="<?php echo htmlspecialchars($form_data['full_name'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">

      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required value="<?php echo htmlspecialchars($form_data['username'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required value="<?php echo htmlspecialchars($form_data['email'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>

      <label for="phone_number">Phone Number:</label>
      <input type="tel" id="phone_number" name="phone_number" value="<?php echo htmlspecialchars($form_data['phone_number'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">

      <label for="gender">Gender:</label>
      <select id="gender" name="gender">
        <option value="" disabled <?php echo !isset($form_data['gender']) ? 'selected' : ''; ?>>-- Please select --</option>
        <option value="Female" <?php echo ($form_data['gender'] ?? '') === 'Female' ? 'selected' : ''; ?>>Female</option>
        <option value="Male" <?php echo ($form_data['gender'] ?? '') === 'Male' ? 'selected' : ''; ?>>Male</option>
        <option value="Other" <?php echo ($form_data['gender'] ?? '') === 'Other' ? 'selected' : ''; ?>>Other</option>
      </select>

      <label for="program">Program:</label>
      <input type="text" id="program" name="program" value="<?php echo htmlspecialchars($form_data['program'] ?? '', ENT_QUOTES, 'UTF-8'); ?>">

      <input type="submit" value="Register">
    </form>
    <a href="login.php" class="login-link">Already have an account? Login</a>
  </div>
</body>
</html>