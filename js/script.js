// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideDown 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos de servicio
document.querySelectorAll('.service-card, .portfolio-item, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Formulario de contacto
const contactoForm = document.getElementById('contactoForm');
if (contactoForm) {
    contactoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulación de envío
        const btn = contactoForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
            contactoForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    });
}

// Agregar clase activa al navegar
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animación de números en estadísticas
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-card h4');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current) + '+';
                setTimeout(updateCount, 30);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // Usar Intersection Observer para iniciar animación cuando sea visible
        const observerStats = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observerStats.unobserve(stat.parentElement);
            }
        });
        
        observerStats.observe(stat.parentElement);
    });
};

// Iniciar animación de estadísticas
animateStats();

// Efecto hover en cards
document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Log de inicialización
console.log('IT Solutions - Página cargada correctamente');
console.log('Propietario: Esthid Raul Paucar Medina');