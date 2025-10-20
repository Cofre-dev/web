# Instrucciones para ejecutar el servidor PHP

## 🚨 Problema: El código PHP se muestra en el navegador

Esto ocurre porque no hay un servidor PHP procesando los archivos. Debes ejecutar un servidor web con soporte PHP.

## ✅ Soluciones

### Opción 1: Usar el servidor integrado de PHP (Desarrollo)

1. Abre una terminal (CMD o PowerShell) en la carpeta del proyecto:
   ```bash
   cd C:\Users\sopor\OneDrive\Desktop\web\ayb
   ```

2. Ejecuta el servidor PHP:
   ```bash
   php -S localhost:8000
   ```

3. Abre tu navegador en:
   ```
   http://localhost:8000/index.html
   ```

4. **Para probar que PHP funciona**, primero ve a:
   ```
   http://localhost:8000/test.php
   ```
   Deberías ver información de PHP y verificaciones del sistema.

### Opción 2: Usar XAMPP (Recomendado para Windows)

1. **Descarga XAMPP:**
   - Ve a: https://www.apachefriends.org/
   - Descarga la versión para Windows

2. **Instala XAMPP:**
   - Ejecuta el instalador
   - Selecciona Apache y PHP durante la instalación

3. **Configura tu proyecto:**
   - Copia la carpeta `ayb` a: `C:\xampp\htdocs\`
   - O crea un Virtual Host apuntando a tu carpeta actual

4. **Inicia Apache:**
   - Abre el Panel de Control de XAMPP
   - Haz clic en "Start" junto a Apache

5. **Accede desde el navegador:**
   ```
   http://localhost/ayb/index.html
   ```

### Opción 3: Usar WAMP (Alternativa para Windows)

Similar a XAMPP, pero con interfaz diferente:
- Descarga desde: https://www.wampserver.com/

### Opción 4: Usar Laragon (Más moderno)

- Descarga desde: https://laragon.org/
- Instalación automática de Apache, PHP, MySQL

## 🧪 Verificar que todo funciona

### Paso 1: Probar PHP
```
http://localhost:8000/test.php
```
o
```
http://localhost/ayb/test.php
```

Deberías ver:
- ✅ PHP está funcionando correctamente
- ✅ Autoloader de Composer encontrado
- ✅ PHPMailer está instalado correctamente
- ✅ MailHandler.php encontrado
- ✅ Clase MailHandler cargada correctamente

### Paso 2: Probar el formulario
1. Ve a tu página principal
2. Llena el formulario de contacto
3. Haz clic en "Enviar Mensaje"
4. Deberías ver un mensaje de éxito

## 📁 Estructura del proyecto

```
ayb/
├── index.html              # Página principal con formulario
├── sendmail.php            # Procesador del formulario (usa MailHandler)
├── test.php               # Archivo de prueba PHP
├── config.php             # Configuración de credenciales SMTP
├── libs/
│   ├── MailHandler.php    # Clase para manejar correos
│   └── vendor/            # Dependencias de Composer (PHPMailer)
└── assets/
    └── img/
```

## 🔧 Configuración de Debug

Si tienes problemas al enviar correos, activa el modo debug:

Edita `sendmail.php` línea 27:
```php
$mailHandler = new MailHandler([
    'smtp_debug' => 2  // Cambiar de 0 a 2 para ver detalles
]);
```

O edita `config.php` y cambia:
```php
'smtp_debug' => 2,
```

## 🔐 Seguridad

### Archivo .gitignore

Crea un archivo `.gitignore` para proteger las credenciales:

```
config.php
sendmail.php
test.php
*.log
```

### Variables de entorno (Producción)

Para producción, considera usar variables de entorno en lugar de `config.php`.

## ❓ Solución de problemas

### El formulario no envía el correo

1. Verifica que el servidor PHP esté corriendo
2. Revisa `test.php` para asegurarte de que todo esté instalado
3. Activa `smtp_debug => 2` para ver errores SMTP
4. Verifica que las credenciales en `config.php` sean correctas
5. Verifica que el puerto 465 esté abierto
6. Revisa los logs del servidor

### Error: "Class 'PHPMailer' not found"

Ejecuta en la terminal:
```bash
cd libs
composer install
```

### Error de permisos

En Windows, ejecuta la terminal como Administrador.

## 📞 Comandos útiles

```bash
# Verificar versión de PHP
php -v

# Ver extensiones PHP instaladas
php -m

# Iniciar servidor PHP en puerto específico
php -S localhost:8080

# Ver los logs en tiempo real (con XAMPP)
tail -f C:\xampp\apache\logs\error.log
```

## ✅ Checklist de verificación

- [ ] PHP instalado y funcionando
- [ ] Servidor web corriendo (PHP integrado, XAMPP, WAMP, etc.)
- [ ] test.php muestra todas las verificaciones en verde
- [ ] Composer instalado y dependencias actualizadas
- [ ] PHPMailer instalado en libs/vendor
- [ ] MailHandler.php creado
- [ ] config.php con credenciales correctas
- [ ] Formulario en index.html apunta a sendmail.php
- [ ] Puerto 465 accesible para SMTP

¡Listo para enviar correos! 📧
