function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showAlert(message) {
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';

    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.innerHTML = `
        <h3>${message}</h3>
        <button onclick="this.closest('.alert-overlay').remove()" style="
            padding: 8px 20px;
            background-color: #000;
            color: #fff;
            border: none;
            cursor: pointer;
            margin-top: 20px;
        ">확인</button>
    `;

    overlay.appendChild(alert);
    document.body.appendChild(overlay);
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});