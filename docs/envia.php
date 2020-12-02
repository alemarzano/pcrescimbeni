
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'ajmarzano@gmail.com';                     // SMTP username
    $mail->Password   = 'piarolo12';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('ajmarzano@gmail.com', 'Alejandro');
    $mail->addAddress('alejandromarzano@encendercomunicacion.com');     // Add a recipient


    // Content
    
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $_POST["asunto"];
    // $mail->Body    = "Email: " . $_POST["email"] . "\n" . $_POST["mensaje"]. "\r\n";
    $mail->Body = "Recibiste una consulta de:<b> ".$_POST['nombre']."</b>"
    ."<br><br> Responder a: ".$_POST['email']
    ."<br><br> <b>Consulta</b>:<br><br><i>".$_POST['mensaje']."</i>";
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo "<script>alert('el mensaje ha sido enviado')</script>";
    echo "<script>setTimeout(\"location.href='index.html'\", 1000)</script>";
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>

