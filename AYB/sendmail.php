<?php
// Cargar autoloader de Composer
require_once 'libs/vendor/autoload.php';

// Cargar la clase MailHandler
require_once 'libs/MailHandler.php';

use AyB\Mail\MailHandler;

// Verificar que la petición sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: index.html");
    exit;
}

// Recoger datos del formulario
$datos = [
    'nombre' => isset($_POST['nombre']) ? trim($_POST['nombre']) : '',
    'email' => isset($_POST['email']) ? trim($_POST['email']) : '',
    'asunto' => isset($_POST['asunto']) ? trim($_POST['asunto']) : '',
    'mensaje' => isset($_POST['mensaje']) ? trim($_POST['mensaje']) : ''
];

try {
    // Crear instancia del manejador de correos
    $mailHandler = new MailHandler([
        'smtp_debug' => 0  // Cambiar a 2 para ver detalles de debug
    ]);

    // Enviar el correo
    $mailHandler->enviarFormularioContacto($datos);

    // Redirigir con mensaje de éxito
    header("Location: index.html?success=1");
    exit;

} catch (Exception $e) {
    // Registrar el error
    error_log("Error al enviar correo: " . $e->getMessage());

    // Determinar el tipo de error para el usuario
    $errorMsg = $e->getMessage();

    if (strpos($errorMsg, 'requerido') !== false) {
        header("Location: index.html?error=campos_vacios");
    } elseif (strpos($errorMsg, 'email') !== false && strpos($errorMsg, 'válido') !== false) {
        header("Location: index.html?error=email_invalido");
    } else {
        header("Location: index.html?error=envio_fallido");
    }
    exit;
}
?>
