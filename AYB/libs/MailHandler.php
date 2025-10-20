<?php
namespace AyB\Mail;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

/**
 * Clase para manejar el envío de correos mediante PHPMailer
 */
class MailHandler {
    private $mail;
    private $config;

    /**
     * Constructor de la clase
     * @param array $config Configuración SMTP
     */
    public function __construct(array $config = []) {
        $this->mail = new PHPMailer(true);

        // Configuración por defecto
        $this->config = array_merge([
            'smtp_host' => 'smtp.araybustamante.cl',
            'smtp_user' => 'soporte@araybustamante.cl',
            'smtp_pass' => 'RmkdvDAyVrRQ',
            'smtp_port' => 465,
            'smtp_secure' => PHPMailer::ENCRYPTION_SMTPS,
            'smtp_debug' => 0,
            'from_email' => 'soporte@araybustamante.cl',
            'from_name' => 'Formulario Web A&B',
            'charset' => 'UTF-8'
        ], $config);

        $this->configurarSMTP();
    }

    /**
     * Configura los parámetros SMTP
     */
    private function configurarSMTP() {
        $this->mail->SMTPDebug = $this->config['smtp_debug'];
        $this->mail->isSMTP();
        $this->mail->Host = $this->config['smtp_host'];
        $this->mail->SMTPAuth = true;
        $this->mail->Username = $this->config['smtp_user'];
        $this->mail->Password = $this->config['smtp_pass'];
        $this->mail->SMTPSecure = $this->config['smtp_secure'];
        $this->mail->Port = $this->config['smtp_port'];
        $this->mail->CharSet = $this->config['charset'];
    }

    /**
     * Envía un correo desde el formulario de contacto
     * @param array $datos Datos del formulario (nombre, email, asunto, mensaje)
     * @return bool True si se envió correctamente
     * @throws Exception Si hay un error al enviar
     */
    public function enviarFormularioContacto(array $datos) {
        // Validar datos requeridos
        $camposRequeridos = ['nombre', 'email', 'asunto', 'mensaje'];
        foreach ($camposRequeridos as $campo) {
            if (empty($datos[$campo])) {
                throw new Exception("El campo '{$campo}' es requerido");
            }
        }

        // Validar formato de email
        if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception("El formato del email no es válido");
        }

        // Sanitizar datos
        $nombre = htmlspecialchars(trim($datos['nombre']), ENT_QUOTES, 'UTF-8');
        $email = filter_var(trim($datos['email']), FILTER_SANITIZE_EMAIL);
        $asunto = htmlspecialchars(trim($datos['asunto']), ENT_QUOTES, 'UTF-8');
        $mensaje = htmlspecialchars(trim($datos['mensaje']), ENT_QUOTES, 'UTF-8');

        try {
            // Configurar remitente
            $this->mail->setFrom($this->config['from_email'], $this->config['from_name']);

            // Configurar respuesta al usuario
            $this->mail->addReplyTo($email, $nombre);

            // Configurar destinatario
            $this->mail->addAddress($this->config['smtp_user'], 'Contacto A&B');

            // Configurar contenido
            $this->mail->isHTML(true);
            $this->mail->Subject = "Contacto Web: " . $asunto;
            $this->mail->Body = $this->generarHTMLEmail($nombre, $email, $asunto, $mensaje);
            $this->mail->AltBody = $this->generarTextoPlano($nombre, $email, $asunto, $mensaje);

            // Enviar
            return $this->mail->send();

        } catch (Exception $e) {
            error_log("Error MailHandler: {$this->mail->ErrorInfo}");
            throw new Exception("No se pudo enviar el correo: {$this->mail->ErrorInfo}");
        }
    }

    /**
     * Genera el contenido HTML del email
     */
    private function generarHTMLEmail($nombre, $email, $asunto, $mensaje) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #c9a96e, #b8945d); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .field strong { color: #c9a96e; display: inline-block; min-width: 80px; }
                .mensaje-box { background: white; padding: 15px; border-left: 4px solid #c9a96e; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2 style='margin: 0;'>Nuevo mensaje desde el formulario de contacto</h2>
                </div>
                <div class='content'>
                    <div class='field'>
                        <strong>Nombre:</strong> {$nombre}
                    </div>
                    <div class='field'>
                        <strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a>
                    </div>
                    <div class='field'>
                        <strong>Asunto:</strong> {$asunto}
                    </div>
                    <div class='field'>
                        <strong>Mensaje:</strong>
                        <div class='mensaje-box'>" . nl2br($mensaje) . "</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";
    }

    /**
     * Genera la versión de texto plano del email
     */
    private function generarTextoPlano($nombre, $email, $asunto, $mensaje) {
        return "NUEVO MENSAJE DESDE EL FORMULARIO DE CONTACTO\n\n" .
               "Nombre: {$nombre}\n" .
               "Email: {$email}\n" .
               "Asunto: {$asunto}\n\n" .
               "Mensaje:\n{$mensaje}\n";
    }

    /**
     * Obtiene el último error
     */
    public function obtenerError() {
        return $this->mail->ErrorInfo;
    }

    /**
     * Reinicia el mailer para enviar otro correo
     */
    public function reiniciar() {
        $this->mail->clearAddresses();
        $this->mail->clearAttachments();
        $this->mail->clearReplyTos();
    }
}
?>
