// Configuración de EmailJS para Ara y Bustamante Consultores

// INSTRUCCIONES PARA CONFIGURAR EMAILJS:
// 1. Ir a https://www.emailjs.com/ y crear una cuenta gratuita
// 2. Crear un nuevo servicio de email (Gmail, Outlook, etc.)
// 3. Crear un template de email
// 4. Reemplazar los valores YOUR_* con los datos reales

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'KiPrY8tXvIGdbv1Tu',        // Tu Public Key de EmailJS
    SERVICE_ID: 'service_qwyuvgm',        // ID del servicio de email
    TEMPLATE_ID: 'template_e5q9wrz'       // Reemplazar con el Template ID real de EmailJS
};

// Template sugerido para EmailJS:
/*
Asunto: Nueva consulta de {{from_name}} - {{company}}

Cuerpo del email:
-------------------
Nueva consulta recibida desde el sitio web:

Nombre: {{from_name}}
Empresa: {{company}}
Email: {{from_email}}
Teléfono: {{phone}}
Servicio de interés: {{service}}

Mensaje:
{{message}}

-------------------
Este email fue enviado automáticamente desde el formulario de contacto del sitio web.
*/

// Función para actualizar la configuración
function updateEmailJSConfig() {
    // Inicializar EmailJS con la configuración
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}