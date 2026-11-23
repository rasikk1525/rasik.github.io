/* ============================================
   Personal Page - JavaScript
   IM22503 Multimedia Web Programming
   ============================================ */

// ---------- Mobile Navigation Toggle ----------
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ---------- Active Nav Link Highlighting ----------
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', function(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  // all your canvas drawing code here
})

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // gentle attraction to mouse
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        this.x += dx / dist * 0.4;
        this.y += dy / dist * 0.4;
      }
    }

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 107, 157, 0.6)';
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();


// ---------- Scroll Reveal Animation ----------
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ---------- Star Rating (Comments Form) ----------
const stars = document.querySelectorAll('.rating .star');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    stars.forEach(s => {
      s.classList.toggle('active', s.dataset.value <= selectedRating);
    });
  });

  star.addEventListener('mouseover', () => {
    stars.forEach(s => {
      s.classList.toggle('active', s.dataset.value <= star.dataset.value);
    });
  });
});

// Reset stars on mouse leave if no selection
const ratingBox = document.querySelector('.rating');
if (ratingBox) {
  ratingBox.addEventListener('mouseleave', () => {
    stars.forEach(s => {
      s.classList.toggle('active', s.dataset.value <= selectedRating);
    });
  });
}

// ---------- Form Validation ----------
const commentForm = document.getElementById('commentForm');
if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Reset errors
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

    // Name validation
    if (name.value.trim() === '') {
      showError('nameError', 'Please enter your name.');
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError('emailError', 'Please enter a valid email address.');
      valid = false;
    }

    // Subject validation
    if (subject.value === '') {
      showError('subjectError', 'Please select a subject.');
      valid = false;
    }

    // Message validation
    if (message.value.trim().length < 10) {
      showError('messageError', 'Message must be at least 10 characters.');
      valid = false;
    }

    // Rating validation
    if (selectedRating === 0) {
      showError('ratingError', 'Please select a rating.');
      valid = false;
    }

    if (valid) {
      const successMsg = document.getElementById('successMsg');
      successMsg.style.display = 'block';
      commentForm.reset();
      selectedRating = 0;
      stars.forEach(s => s.classList.remove('active'));
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  }
}

// ---------- Animated Counter (fun touch) ----------
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;
    const increment = target / 50;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 30);
    } else {
      counter.innerText = target + '+';
    }
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(c => counterObserver.observe(c));
}

// ---------- Dynamic Year in Footer ----------
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
