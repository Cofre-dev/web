const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'KiPrY8tXvIGdbv1Tu',
    SERVICE_ID: 'service_qwyuvgm',      
    TEMPLATE_ID: 'template_e5q9wrz'       
};

// Template sugerido para EmailJS:

Nombre: {{from_name}}
Empresa: {{company}}
Email: {{from_email}}
Teléfono: {{phone}}
interés: {{service}}

Mensaje:
{{message}}


let menssage = "Este email fue enviado automáticamente desde el formulario de contacto del sitio web";

function updateEmailJSConfig() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}