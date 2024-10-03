<?php
// Start the session
session_start();

// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "user_db");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare SQL query to fetch the user
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        
        // Check password directly without hashing (for this example)
        if ($password === $row['password']) {
            // Store session variables
            $_SESSION['username'] = $row['username'];
            $_SESSION['name'] = $row['name'];
            
            // Redirect to the dashboard or home page
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "Username not found!";
    }
}

// Close the connection
mysqli_close($conn);
?>
