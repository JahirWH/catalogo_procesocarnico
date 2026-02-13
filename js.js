// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const productModal = document.getElementById('productModal');
const requestModal = document.getElementById('requestModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const btnRequestProduct = document.getElementById('btnRequestProduct');
const requestForm = document.getElementById('requestForm');
const reqProducto = document.getElementById('reqProducto');

let selectedProductId = null;

// Product information database with names
const productInfo = {
    'inyector-21n': {
        title: 'IDR Xel-Há 21-N',
        name: 'Inyector IDR Xel-Há 21-N',
        content: `
            <h4>Inyector de Alto Rendimiento</h4>
            <p>Sistema de inyección en espiral con 21 agujas especialmente diseñadas para garantizar una distribución uniforme del líquido de inyección.</p>
            
            <h4>Características Principales</h4>
            <ul>
                <li>✓ 21 agujas en configuración espiral</li>
                <li>✓ Distribución uniforme de la inyección</li>
                <li>✓ Resultados consistentes y alta calidad</li>
                <li>✓ Construcción en acero inoxidable</li>
                <li>✓ Optimización del proceso productivo</li>
            </ul>
            
            <h4>Beneficios</h4>
            <p>Agrega jugosidad, suavidad y sabor único a productos cárnicos con mezclas de aditivos, especias y saborizantes aprobados para consumo humano.</p>
        `
    },
    'inyector-31n': {
        title: 'IDR Xel-Há 31-N',
        name: 'Inyector IDR Xel-Há 31-N',
        content: `
            <h4>Inyector de Alto Rendimiento</h4>
            <p>Transforma piezas de carne rígidas o secas en productos premium. Añade valor agregado y toque único de sabor.</p>
            
            <h4>Ventajas del Sistema</h4>
            <ul>
                <li>✓ Rendimiento de hasta 100%</li>
                <li>✓ Reduce la merma de producto</li>
                <li>✓ Aprovecha al máximo los recursos</li>
                <li>✓ Mezclas con aditivos y especias aprobados</li>
                <li>✓ Sistema de inyección preciso</li>
            </ul>
            
            <h4>Aplicaciones</h4>
            <p>Ideal para introducir componentes como especias, grasas, aceites o moléculas grandes dentro del músculo cárnico.</p>
        `
    },
    'inyector-61n': {
        title: 'IDR Xel-Há 61-N',
        name: 'Inyector IDR Xel-Há 61-N',
        content: `
            <h4>Inyector Industrial de Alta Capacidad</h4>
            <p>Sistema profesional para procesamiento cárnico que maximiza el rendimiento y reduce costos operativos.</p>
            
            <h4>Especificaciones</h4>
            <ul>
                <li>✓ 61 agujas de inyección</li>
                <li>✓ Sistema de distribución uniforme</li>
                <li>✓ Reducción significativa de merma</li>
                <li>✓ Mejora la jugosidad y suavidad</li>
                <li>✓ Compatible con diversos aditivos</li>
            </ul>
            
            <h4>Resultados</h4>
            <p>Permite transformar productos y agregar valor mediante saborizantes seguros para consumo humano.</p>
        `
    },
    'inyector-122n': {
        title: 'IDR Xel-Há 122-N',
        name: 'Inyector IDR Xel-Há 122-N',
        content: `
            <h4>Inyector de Máxima Capacidad</h4>
            <p>Solución industrial para grandes volúmenes de producción. Tecnología de punta en procesamiento cárnico.</p>
            
            <h4>Características Técnicas</h4>
            <ul>
                <li>✓ 122 agujas de inyección</li>
                <li>✓ Mayor capacidad de producción</li>
                <li>✓ Rendimiento hasta 100%</li>
                <li>✓ Sistema automático de distribución</li>
                <li>✓ Construcción robusta y durable</li>
            </ul>
            
            <h4>Beneficios</h4>
            <p>Aprovecha al máximo todos los recursos de origen animal, transforma piezas de carne en productos premium con sabor único.</p>
        `
    },
    'agitador-ekbalam': {
        title: 'Agitador de Salmuera Ek Balam',
        name: 'Agitador de Salmuera Ek Balam',
        content: `
            <h4>Mezclas Homogéneas Directo al Inyector</h4>
            <p>Diseño perfectamente pensado para distintas necesidades de la industria, compatible con cualquier inyector.</p>
            
            <h4>Funcionalidad</h4>
            <ul>
                <li>✓ Mezcla homogénea de salmuera</li>
                <li>✓ Elimina grumos en la mezcla</li>
                <li>✓ No calienta la salmuera</li>
                <li>✓ Compatible con cualquier inyector</li>
                <li>✓ Operación continua eficiente</li>
            </ul>
            
            <h4>Ventaja Competitiva</h4>
            <p>Garantiza la calidad de la mezcla antes de la inyección, optimizando el proceso completo de marinado.</p>
        `
    }
};

// Función para abrir modal de detalles del producto
function openProductModal(productId) {
    const product = productInfo[productId];
    
    if (product) {
        selectedProductId = productId;
        modalTitle.textContent = product.title;
        modalContent.innerHTML = product.content;
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar modales
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para abrir modal de solicitud
function openRequestModal() {
    const product = productInfo[selectedProductId];
    
    if (product) {
        reqProducto.value = product.name;
        requestModal.style.display = 'block';
        productModal.style.display = 'none';
        document.body.style.overflow = 'hidden';
        document.getElementById('reqNombre').focus();
    }
}

// Event listeners para botones "Ver Detalles"
document.querySelectorAll('.btn-secondary[data-product]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const productId = this.getAttribute('data-product');
        console.log('Click en producto:', productId);
        openProductModal(productId);
    });
});

// Event listeners para cerrar modales
modalCloseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeModal(productModal);
    }
    if (e.target === requestModal) {
        closeModal(requestModal);
    }
});

// Cerrar modales con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (productModal.style.display === 'block') {
            closeModal(productModal);
        }
        if (requestModal.style.display === 'block') {
            closeModal(requestModal);
        }
    }
});

// Botón "Solicitar Este Producto" en el modal de detalles
btnRequestProduct.addEventListener('click', openRequestModal);

// Manejador del formulario de solicitud
requestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        producto: document.getElementById('reqProducto').value,
        nombre: document.getElementById('reqNombre').value,
        empresa: document.getElementById('reqEmpresa').value,
        email: document.getElementById('reqEmail').value,
        telefono: document.getElementById('reqTelefono').value,
        mensaje: document.getElementById('reqMensaje').value
    };
    
    console.log('Solicitud de producto:', formData);
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por tu solicitud! Nos pondremos en contacto pronto.');
    
    // Resetear formulario y cerrar modal
    requestForm.reset();
    closeModal(requestModal);
    selectedProductId = null;
    
    // En una aplicación real, aquí enviarías los datos al servidor:
    /*
    fetch('/api/product-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('¡Gracias por tu solicitud! Nos pondremos en contacto pronto.');
        requestForm.reset();
        closeModal(requestModal);
    })
    .catch(error => {
        alert('Hubo un error. Por favor, intenta nuevamente.');
    });
    */
});


// Form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            nombre: document.getElementById('nombre').value,
            empresa: document.getElementById('empresa').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            producto: document.getElementById('producto').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Here you would normally send the data to a server
        console.log('Form data:', formData);
        
        // Show success message
        alert('¡Gracias por tu consulta! Te contactaremos pronto.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would use fetch() to send data to your backend:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('¡Gracias por tu consulta! Te contactaremos pronto.');
            contactForm.reset();
        })
        .catch(error => {
            alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
        });
        */
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// funciones nuevas para 360


function modalinfo() {
  document.getElementById("modalCotizacion").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalCotizacion").style.display = "none";
}

window.addEventListener("click", function(e) {
  const modal = document.getElementById("modalCotizacion");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("formCotizacion").addEventListener("submit", function(e) {
  e.preventDefault();

  const producto = document.getElementById("productoSeleccionado").value;

  alert("Solicitud enviada para: " + producto);

  cerrarModal();
});


// Cerrar al hacer clic fuera
window.addEventListener("click", function(e) {
  const modal = document.getElementById("modalCotizacion");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Simulación de envío
document.getElementById("formCotizacion").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Solicitud enviada correctamente");
  cerrarModal();
});

// divisor






