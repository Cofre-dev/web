<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require '../AYB/libs/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: index.html");
    exit;
}

// Validar y sanitizar datos
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$asunto = isset($_POST['asunto']) ? trim($_POST['asunto']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

// Validar campos requeridos
if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
    header("Location: index.html?error=campos_vacios");
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: index.html?error=email_invalido");
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0;                                      
    $mail->isSMTP();
    $mail->Host       = 'smtp.araybustamante.cl';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contacto@araybustamante.cl';
    $mail->Password   = 'RmkdvDAyVrRQ';                               
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';                               
    $mail->setFrom('contacto@araybustamante.cl', 'Formulario Web');
    $mail->addReplyTo($email, $nombre);                        
    $mail->addAddress('contacto@araybustamante.cl', 'Contacto A&B');


    $mail->isHTML(true);
    $mail->Subject = "Contacto Web: " . $asunto;
    $mail->Body    = "
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> {$nombre}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Asunto:</strong> {$asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>{$mensaje}</p>
    ";
    $mail->AltBody = "Nombre: {$nombre}\nEmail: {$email}\nAsunto: {$asunto}\n\nMensaje:\n{$mensaje}";

    $mail->send();
    header("Location:index.html");
    exit;

} catch (Exception $e) {
    error_log("Error al enviar correo: {$mail->$e}");
    header("Location: index.html?error=envio_fallido");
    exit;
}
?>