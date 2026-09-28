/* ==========================================================================
   Rizvandy Akbar P.R - Main JavaScript Entry Point
   Coordinates module initialization, smooth scrolling, and form logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Language Switcher (Indonesian / English)
  if (typeof initLanguageSwitcher === "function") {
    initLanguageSwitcher();
  }

  // 2. Initialize Navigation Behavior
  if (typeof initNavigation === "function") {
    initNavigation();
  }

  // 3. Initialize Projects & Filters
  if (typeof renderProjects === "function") {
    const currentLang = typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id";
    renderProjects(currentLang);
  }

  if (typeof initProjectFilters === "function") {
    initProjectFilters();
  }

  // 4. Smooth Scroll for Anchor Links
  setupSmoothScrolling();

  // 5. Contact Form Handler (Honest & Ready for Future Integration)
  setupContactForm();
});

/**
 * Configure Smooth Scrolling for all internal hash links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70; // Height of navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Contact Form Setup
 * Explicitly avoids fake "Message Sent" alerts per requirements.
 */
function setupContactForm() {
  const contactForm = document.getElementById("portfolio-contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const subject = document.getElementById("form-subject").value;
    const message = document.getElementById("form-message").value;

    const currentLang = typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id";

    // Instead of showing a fake "Message Sent Successfully" alert, redirect user to mailto or show mailto trigger
    const mailtoSubject = encodeURIComponent(subject || (currentLang === "en" ? "Inquiry from Portfolio Website" : "Pesan dari Website Portfolio"));
    const mailtoBody = encodeURIComponent(`Halo Rizvandy,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);

    // Open native email client
    window.location.href = `mailto:rizvandyakbar25@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  });
}

/* ==========================================================================
   SCROLL REVEAL ANIMATION
   Menggunakan Intersection Observer API untuk mendeteksi elemen
   yang masuk ke viewport, lalu menambahkan class "active".
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);