// ============ MÚSICA ============
let musicaIniciada = false;
const audio = document.getElementById('audio');
const btnMusica = document.getElementById('btn-musica');

function toggleMusica() {
    if (!musicaIniciada) {
        iniciarMusica();
    } else {
        if (audio.paused) {
            audio.play();
            btnMusica.classList.add('playing');
        } else {
            audio.pause();
            btnMusica.classList.remove('playing');
        }
    }
}

function iniciarMusica() {
    if (!musicaIniciada) {
        musicaIniciada = true;
        audio.play().then(() => {
            btnMusica.classList.add('playing');
        }).catch(e => {
            console.log('Audio no disponible');
        });
    }
}

// ============ COUNTDOWN ============
const countdownSection = document.getElementById('countdown');
const fecha = countdownSection.dataset.fecha || '2026-08-15';
const hora = countdownSection.dataset.hora || '18:00';
const targetDate = new Date(`${fecha}T${hora}:00`).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
    document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============ MODAL ============
function openModal() {
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-btn')) {
        return;
    }
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'hero') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    }
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============ VISIBILITY ============
document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) {
        audio.pause();
    } else if (!document.hidden && musicaIniciada && btnMusica.classList.contains('playing')) {
        audio.play();
    }
});
