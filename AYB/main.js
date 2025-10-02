// Ara y Bustamante Consultores - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Configuración de EmailJS
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'KiPrY8tXvIGdbv1Tu',        
        SERVICE_ID: 'service_qwyuvgm',          
        TEMPLATE_ID: 'template_e5q9wrz'         
    };

    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        window.EMAILJS_CONFIG = EMAILJS_CONFIG;
    }

    // Inicialización de todas las funcionalidades
    initNavigation();
    initScrollEffects();
    initTeamCards();
    initFormHandling();
    initAnimations();
});

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Navegación suave y destacado de sección activa
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            navLinks.forEach(nl => nl.classList.remove('active'));
            
            // Agregar clase activa al enlace clickeado
            this.classList.add('active');
            
            // Scroll suave a la sección
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== EFECTOS DE SCROLL ====================
function initScrollEffects() {
    // Crear el observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .stat-item, .leadership-content, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

}

function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const linkedinBtn = card.querySelector('.linkedin-btn');
        const linkedinUrl = card.getAttribute('data-linkedin');
        
        // Evento click en la tarjeta completa
        card.addEventListener('click', function(e) {
            // Si se hace click en el botón de LinkedIn, prevenir propagación
            if (e.target.closest('.linkedin-btn')) {
                e.stopPropagation();
                return;
            }
            
            // Efecto visual de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Evento click en el botón de LinkedIn
        if (linkedinBtn && linkedinUrl && linkedinUrl !== '#') {
            linkedinBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Efecto visual
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Abrir LinkedIn en nueva pestaña
                window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
            });
        } else if (linkedinBtn) {
            // Si no hay URL, mostrar mensaje
            linkedinBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showNotification('Perfil de LinkedIn no disponible');
            });
        }
        
        // Efectos de hover mejorados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ==================== MANEJO DEL FORMULARIO ====================
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    const submitBtn = form.querySelector('.btn-primary');
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover errores previos
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Validaciones específicas
    switch(field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                errorMessage = 'Por favor ingrese un email válido';
                isValid = false;
            }
            break;
        case 'tel':
            if (value && !isValidPhone(value)) {
                errorMessage = 'Por favor ingrese un teléfono válido';
                isValid = false;
            }
            break;
        default:
            if (field.hasAttribute('required') && !value) {
                errorMessage = 'Este campo es obligatorio';
                isValid = false;
            }
            break;
    }
    
    // Mostrar error si no es válido
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem;';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function submitForm() {
    const form = document.querySelector('.contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;

    // Validar todos los campos requeridos
    requiredFields.forEach(field => {
        const event = { target: field };
        if (!validateField(event)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showNotification('Por favor complete todos los campos obligatorios', 'error');
        return;
    }

    // Recopilar datos del formulario
    const formData = {
        from_name: document.getElementById('nombre').value,
        from_email: document.getElementById('email').value,
        company: document.getElementById('empresa').value || 'No especificada',
        phone: document.getElementById('telefono').value || 'No especificado',
        service: document.getElementById('servicio').value || 'No especificado',
        message: document.getElementById('mensaje').value,
        reply_to: document.getElementById('email').value
    };

    // Mostrar estado de envío
    const submitBtn = form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Debug: Verificar configuración antes de enviar
    console.log('Configuración EmailJS:', window.EMAILJS_CONFIG);
    console.log('Datos del formulario:', formData);

    // Verificar que EmailJS esté disponible
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS no está cargado');
        showNotification('Error: EmailJS no está disponible. Verifique la conexión a internet.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        return;
    }

    // Enviar email usando EmailJS
    emailjs.send(window.EMAILJS_CONFIG.SERVICE_ID, window.EMAILJS_CONFIG.TEMPLATE_ID, formData)
        .then(function(response) {
            console.log('Email enviado exitosamente!', response.status, response.text);

            // Resetear formulario
            form.querySelectorAll('input, select, textarea').forEach(field => {
                field.value = '';
            });

            // Mostrar mensaje de éxito
            showNotification('¡Consulta enviada exitosamente! Nos contactaremos pronto.', 'success');
        })
        .catch(function(error) {
            console.error('Error completo al enviar el email:', error);

            // Mostrar error más específico
            let errorMessage = 'Error al enviar la consulta. ';
            if (error.status === 405) {
                errorMessage += 'Error de configuración (Method Not Allowed). Verifique las credenciales de EmailJS.';
            } else if (error.status === 400) {
                errorMessage += 'Datos del formulario inválidos.';
            } else if (error.status === 403) {
                errorMessage += 'Acceso denegado. Verifique la configuración del servicio.';
            } else {
                errorMessage += `Error ${error.status || 'desconocido'}: ${error.text || error.message || 'Error de conexión'}`;
            }

            showNotification(errorMessage, 'error');
        })
        .finally(function() {
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
        });
}

// ==================== ANIMACIONES ====================
function initAnimations() {
    // CSS personalizado para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-item.animate-in {
            animation: statCounter 1s ease-out 0.3s both;
        }
        
        @keyframes statCounter {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.8);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .service-card.animate-in {
            animation: slideInUp 0.6s ease-out both;
        }
        
        .service-card:nth-child(1) { animation-delay: 0.1s; }
        .service-card:nth-child(2) { animation-delay: 0.2s; }
        .service-card:nth-child(3) { animation-delay: 0.3s; }
        .service-card:nth-child(4) { animation-delay: 0.4s; }
        .service-card:nth-child(5) { animation-delay: 0.5s; }
        .service-card:nth-child(6) { animation-delay: 0.6s; }
        
        @keyframes slideInUp {
            0% {
                opacity: 0;
                transform: translateY(40px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .team-card.animate-in {
            animation: fadeInScale 0.6s ease-out both;
        }
        
        .team-card:nth-child(1) { animation-delay: 0.1s; }
        .team-card:nth-child(2) { animation-delay: 0.2s; }
        .team-card:nth-child(3) { animation-delay: 0.3s; }
        .team-card:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.9) translateY(20px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .notification.success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .notification.error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
    `;
    document.head.appendChild(style);
}

// ==================== UTILIDADES ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type = 'success') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ==================== EVENTOS GLOBALES ====================

// Scroll suave para todos los enlaces internos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Mejorar la experiencia de carga
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Efecto de aparición gradual del contenido
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            opacity: 0;
        }
        
        body.loaded {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

// Exposer la función submitForm globalmente para el botón
window.submitForm = submitForm;