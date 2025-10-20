<?php
/**
 * Archivo de configuración para PHPMailer
 * IMPORTANTE: Añadir este archivo a .gitignore para proteger las credenciales
 */

return [
    // Configuración SMTP
    'smtp_host' => 'smtp.araybustamante.cl',
    'smtp_user' => 'soporte@araybustamante.cl',
    'smtp_pass' => 'RmkdvDAyVrRQ',
    'smtp_port' => 465,
    'smtp_secure' => PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS,

    // Configuración de correos
    'from_email' => 'soporte@araybustamante.cl',
    'from_name' => 'Formulario Web A&B',

    // Configuración general
    'charset' => 'UTF-8',
    'smtp_debug' => 0, // 0 = sin debug, 1 = mensajes cliente, 2 = mensajes cliente y servidor
];
?>
