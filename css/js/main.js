// Optimized Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navLinks.classList.contains('active') && 
          !event.target.closest('.nav-links') && 
          !event.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
      }
    });
  }

  // Improved smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
            
            // Update URL without reload
            if (history.pushState) {
              history.pushState(null, null, targetId);
            }
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
            }
          }
        }
      });
    }
  });

  // Password toggle functionality
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.replace('fa-eye-slash', 'fa-eye');
      } else {
        input.type = 'password';
        this.classList.replace('fa-eye', 'fa-eye-slash');
      }
    });
  });

  // Optimized IntersectionObserver for animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section-title, .deal-card, .category-card, .testimonial-card').forEach(el => {
      observer.observe(el);
    });
  }
});

// Add this for better scroll performance
document.addEventListener('scroll', function() {
  // Empty function to ensure smooth scrolling
}, { passive: true });