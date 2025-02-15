document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 200;
        
        function updateCount() {
            const count = parseInt(stat.innerText);
            if(count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        }
        
        updateCount();
    });

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {threshold: 0.1});

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Add this to your CSS
.fade-in {
    animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Parallax effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const coords = (scrolled * 0.4) + 'px';
        element.style.transform = `translateY(${coords})`;
    });
});

// Testimonial carousel
const testimonials = document.querySelector('.testimonial-carousel');
let isDown = false;
let startX;
let scrollLeft;

testimonials.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - testimonials.offsetLeft;
    scrollLeft = testimonials.scrollLeft;
});

testimonials.addEventListener('mouseleave', () => {
    isDown = false;
});

testimonials.addEventListener('mouseup', () => {
    isDown = false;
});

testimonials.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonials.offsetLeft;
    const walk = (x - startX) * 3;
    testimonials.scrollLeft = scrollLeft - walk;
});

// Interactive map (using Leaflet.js)
// Make sure to include Leaflet CSS and JS in your HTML
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add markers for your impact locations
const locations = [
    { lat: 40.7128, lng: -74.0060, name: "New York" },
    { lat: -33.8688, lng: 151.2093, name: "Sydney" },
    { lat: 51.5074, lng: -0.1278, name: "London" }
];

locations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map)
        .bindPopup(loc.name);
});

// Image gallery lightbox
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox .close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Countdown timer
const countdownDate = new Date("2024-12-31T00:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "Event has started!";
    }
}, 1000);

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
});

// Animated number counters
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animated progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = `${percentage}%`;
    });
}

// Intersection Observer for animations
const aboutSection = document.querySelector('#about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate number counters
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            });

            // Animate progress bars
            animateProgressBars();

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);s


/*-------terms & privacy policy-------*/
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({behavior: 'smooth'});
        });
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const h2 = section.querySelector('h2');
        const content = section.querySelector('.content');
        
        h2.addEventListener('click', function() {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
});