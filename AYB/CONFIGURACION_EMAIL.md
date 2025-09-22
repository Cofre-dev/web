# Configuración de EmailJS para Envío Directo de Correos

## ¿Qué es EmailJS?
EmailJS es un servicio gratuito que permite enviar emails directamente desde JavaScript sin necesidad de un backend. Ideal para formularios de contacto.

## Pasos para Configurar EmailJS

### 1. Crear Cuenta en EmailJS
1. Ir a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Hacer clic en "Sign Up" y crear una cuenta gratuita
3. Verificar el email de confirmación

### 2. Configurar un Servicio de Email
1. En el dashboard, ir a "Email Services"
2. Hacer clic en "Add New Service"
3. Seleccionar tu proveedor de email (Gmail, Outlook, etc.)
4. Seguir las instrucciones para conectar tu cuenta
5. **Importante**: Guardar el `Service ID` que se genera

### 3. Crear un Template de Email
1. Ir a "Email Templates"
2. Hacer clic en "Create New Template"
3. Configurar el template con estos campos:

**Asunto del email:**
```
Nueva consulta de {{from_name}} - {{company}}
```

**Cuerpo del email:**
```
Nueva consulta recibida desde el sitio web de Ara y Bustamante Consultores:

Datos del consultante:
- Nombre: {{from_name}}
- Empresa: {{company}}
- Email: {{from_email}}
- Teléfono: {{phone}}
- Servicio de interés: {{service}}

Mensaje:
{{message}}

---
Este email fue enviado automáticamente desde el formulario de contacto.
Para responder, usar el email: {{from_email}}
```

4. Configurar que el email se envíe a: `contacto@araybustamante.cl`
5. Guardar el template y anotar el `Template ID`

### 4. Obtener la Public Key
1. Ir a "Account" → "General"
2. Copiar la "Public Key"

### 5. Actualizar el Código
Abrir el archivo `main.js` y reemplazar estas líneas (líneas 6-8):

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'tu_public_key_aqui',
    SERVICE_ID: 'tu_service_id_aqui',
    TEMPLATE_ID: 'tu_template_id_aqui'
};
```

## Ejemplo de Configuración
```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'user_abc123def456',
    SERVICE_ID: 'service_gmail_xyz789',
    TEMPLATE_ID: 'template_contact_form'
};
```

## Verificar Funcionamiento
1. Abrir `index.html` en el navegador
2. Llenar el formulario de contacto
3. Hacer clic en "Enviar consulta"
4. Verificar que llegue el email a `contacto@araybustamante.cl`

## Límites del Plan Gratuito
- 200 emails por mes
- Sin límite de templates
- Soporte básico

## Alternativas si EmailJS no Funciona

### Opción 1: Formspree
1. Ir a [https://formspree.io/](https://formspree.io/)
2. Crear cuenta y obtener endpoint
3. Cambiar el formulario para usar POST a su endpoint

### Opción 2: Netlify Forms (si usas Netlify)
1. Agregar `netlify` attribute al form
2. Netlify maneja automáticamente el envío

### Opción 3: Backend Propio
Crear un servidor con Node.js/PHP que maneje el envío de emails.

## Solución de Problemas
- **Error de CORS**: Verificar que el dominio esté configurado en EmailJS
- **Email no llega**: Verificar spam/basura
- **Error de configuración**: Revisar que todos los IDs sean correctos
- **Límite excedido**: Upgrade a plan pagado o usar otra alternativa

## Contacto
Si necesitas ayuda con la configuración, contactar al desarrollador.