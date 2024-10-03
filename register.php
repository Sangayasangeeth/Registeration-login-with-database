<?php
// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "user_db");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name1'];
    $username = $_POST['username'];
    $gender = $_POST['gender'];
    $phonenum = $_POST['phonenum'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['password2'];

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo "Passwords do not match!";
        exit();
    }

    // Check if the username already exists
    $check_username_query = "SELECT * FROM users WHERE username = '$username'";
    $username_result = mysqli_query($conn, $check_username_query);

    // Check if the email already exists
    $check_email_query = "SELECT * FROM users WHERE email = '$email'";
    $email_result = mysqli_query($conn, $check_email_query);

    // Handle duplicate username or email
    if (mysqli_num_rows($username_result) > 0) {
        echo "Username already exists!";
        exit();
    } elseif (mysqli_num_rows($email_result) > 0) {
        echo "Email already exists!";
        exit();
    } else {
        // Store the password as plain text (for this example, but hash it in production)
        $plain_password = $password;

        // Insert new user into the database
        $sql = "INSERT INTO users (name, username, gender, phonenum, email, password) 
                VALUES ('$name', '$username', '$gender', '$phonenum', '$email', '$plain_password')";

        if (mysqli_query($conn, $sql)) {
            echo "Registration successful!";
            header("Location: login.html"); // Redirect to login page after successful registration
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    }
}

// Close the connection
mysqli_close($conn);
?>
