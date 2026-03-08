<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);
    
    // Check that data was sent
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill all fields correctly.";
        exit;
    }
    
    // Set recipient email
    $recipient = "your-email@example.com"; // CHANGE THIS TO YOUR EMAIL
    
    // Set email subject
    $email_subject = "New Contact: $subject";
    
    // Build email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Build email headers
    $email_headers = "From: $name <$email>";
    
    // Send email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
        
        // Redirect to thank you page or back to contact
        header("Location: contact.html?success=1");
        exit;
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission.";
}
?>