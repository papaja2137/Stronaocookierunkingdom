// Funkcja do płynnego przewijania do sekcji po kliknięciu w link nawigacyjny
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Obsługa przycisku "Dowiedz się więcej" w sekcji historia
    const historiaButton = document.getElementById('historiaButton');
    const historiaZamknij = document.getElementById('historiaZamknij');
    const pelnaHistoria = document.getElementById('pelnaHistoria');
    const videoButton = document.getElementById('videoButton');
    
    if (historiaButton && pelnaHistoria && historiaZamknij) {
        historiaButton.addEventListener('click', function() {
            pelnaHistoria.classList.remove('hidden');
            
            // Animacja pokazania pełnej historii
            setTimeout(() => {
                pelnaHistoria.style.opacity = '1';
                pelnaHistoria.style.transform = 'translateY(0)';
                
                // Przewijanie do pełnej historii
                pelnaHistoria.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
            
            // Ukrycie przycisku "Dowiedz się więcej"
            historiaButton.style.display = 'none';
        });
        
        historiaZamknij.addEventListener('click', function() {
            // Animacja ukrycia pełnej historii
            pelnaHistoria.style.opacity = '0';
            pelnaHistoria.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                pelnaHistoria.classList.add('hidden');
                
                // Pokazanie przycisku "Dowiedz się więcej"
                historiaButton.style.display = 'inline-block';
                
                // Przewijanie do głównej sekcji historia
                document.querySelector('#historia').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
    }
    
    // Animacja elementów przy scrollowaniu
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fact-card, .gallery-item, .tip-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Dodanie stylu dla animacji
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .fact-card, .gallery-item, .tip-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fact-card.animate, .gallery-item.animate, .tip-card.animate, .timeline-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Nasłuchiwanie zdarzenia scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Wywołanie funkcji po załadowaniu strony
    animateOnScroll();

    // Obsługa przycisku filmu
    videoButton.addEventListener('click', function() {
        const videoUrl = 'https://www.youtube.com/embed/5BaptjAUdMU?si=k0LuJkxgkfI9HUWs';
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <span class="close-video">&times;</span>
                <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        `;
        document.body.appendChild(modal);

        const closeVideo = modal.querySelector('.close-video');
        closeVideo.addEventListener('click', function() {
            modal.remove();
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
}); 