// Main JavaScript file for TG Master website
document.addEventListener("DOMContentLoaded", function () {
  console.log("TG Master website loaded successfully!");

  // Initialize all components
  initNavbar();
  initCarousel();
  initAnimations();
  initSmoothScroll();
  initMegaMenu();
  initCounters();
  initFormValidation();

  // Add loading animation
  document.body.classList.add("loaded");
});

// Navbar functionality
function initNavbar() {
  const navbar = document.querySelector(".header-main");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove("show");
      }
    });
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Carousel enhancements
function initCarousel() {
  const carousel = document.querySelector("#heroCarousel");
  if (!carousel) return;

  // Add pause on hover
  carousel.addEventListener("mouseenter", function () {
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    if (bsCarousel) {
      bsCarousel.pause();
    }
  });

  carousel.addEventListener("mouseleave", function () {
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    if (bsCarousel) {
      bsCarousel.cycle();
    }
  });

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    if (!bsCarousel) return;

    if (e.key === "ArrowLeft") {
      bsCarousel.prev();
    } else if (e.key === "ArrowRight") {
      bsCarousel.next();
    }
  });
}

// Scroll animations
function initAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Special handling for counters
        if (entry.target.classList.contains("stat-number")) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".stat-card, .program-card, .innovation-card, .student-card, .feature-card, .value-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight =
          document.querySelector(".header-main").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Mega menu functionality
function initMegaMenu() {
  const megaDropdowns = document.querySelectorAll(".mega-dropdown");

  megaDropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu");
    let timeoutId;

    dropdown.addEventListener("mouseenter", function () {
      clearTimeout(timeoutId);
      menu.style.display = "block";
      setTimeout(() => {
        menu.classList.add("show");
      }, 10);
    });

    dropdown.addEventListener("mouseleave", function () {
      menu.classList.remove("show");
      timeoutId = setTimeout(() => {
        menu.style.display = "none";
      }, 300);
    });

    // Keyboard navigation
    dropdown.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        menu.classList.remove("show");
        menu.style.display = "none";
      }
    });
  });
}

// Counter animation
function initCounters() {
  // This will be triggered by the intersection observer
}

function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/\D/g, ""));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Preserve the original format (with suffixes like 'e', '+', etc.)
    const originalText = element.textContent;
    const numericPart = Math.floor(current);
    const suffix = originalText.replace(/\d+/, "");
    element.textContent = numericPart + suffix;
  }, 16);
}

// Form validation (for future contact forms)
function initFormValidation() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance optimizations
const debouncedResize = debounce(function () {
  // Handle resize events
  console.log("Window resized");
}, 250);

const throttledScroll = throttle(function () {
  // Handle scroll events that need throttling
}, 16);

window.addEventListener("resize", debouncedResize);
window.addEventListener("scroll", throttledScroll);

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

// Accessibility enhancements
document.addEventListener("keydown", function (e) {
  // Skip to main content with Tab key
  if (
    e.key === "Tab" &&
    !e.shiftKey &&
    document.activeElement === document.body
  ) {
    const mainContent =
      document.querySelector("main") || document.querySelector("#home");
    if (mainContent) {
      mainContent.focus();
      e.preventDefault();
    }
  }
});

// Preload critical images
function preloadImages() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
preloadImages();

// Service Worker registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}

// Analytics and tracking (placeholder)
function trackEvent(category, action, label) {
  // Google Analytics or other tracking
  console.log("Event tracked:", category, action, label);
}

// Track important user interactions
document.addEventListener("click", function (e) {
  if (e.target.matches(".btn-primary, .btn-accent")) {
    trackEvent("Button", "Click", e.target.textContent.trim());
  }

  if (e.target.matches(".nav-link")) {
    trackEvent("Navigation", "Click", e.target.textContent.trim());
  }
});

// Cookie consent (placeholder)
function initCookieConsent() {
  // Implementation for GDPR compliance
  const cookieConsent = localStorage.getItem("cookieConsent");
  if (!cookieConsent) {
    // Show cookie banner
    console.log("Cookie consent needed");
  }
}

// Initialize cookie consent
setTimeout(initCookieConsent, 2000);

// Print styles optimization
window.addEventListener("beforeprint", function () {
  document.body.classList.add("printing");
});

window.addEventListener("afterprint", function () {
  document.body.classList.remove("printing");
});

// Dynamic content loading (for future features)
function loadDynamicContent(section) {
  // Placeholder for dynamic content loading
  console.log("Loading dynamic content for:", section);
}

// Search functionality (placeholder)
function initSearch() {
  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function (e) {
        const query = e.target.value;
        if (query.length > 2) {
          // Perform search
          console.log("Searching for:", query);
        }
      }, 300)
    );
  }
}

// Language switching (placeholder)
function initLanguageSwitcher() {
  const langSwitcher = document.querySelector("#language-switcher");
  if (langSwitcher) {
    langSwitcher.addEventListener("change", function (e) {
      const selectedLang = e.target.value;
      // Change language
      console.log("Language changed to:", selectedLang);
    });
  }
}

// Theme switching (placeholder for dark mode)
function initThemeSwitcher() {
  const themeSwitcher = document.querySelector("#theme-switcher");
  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }
}

// Initialize additional features
document.addEventListener("DOMContentLoaded", function () {
  initSearch();
  initLanguageSwitcher();
  initThemeSwitcher();
});

// Export functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initNavbar,
    initCarousel,
    initAnimations,
    debounce,
    throttle,
  };
}
