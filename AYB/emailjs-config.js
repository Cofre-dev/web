const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'KiPrY8tXvIGdbv1Tu',
    SERVICE_ID: 'service_qwyuvgm',      
    TEMPLATE_ID: 'template_e5q9wrz'       
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