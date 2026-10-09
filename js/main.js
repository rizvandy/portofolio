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

  // 3. Initialize Projects
  if (typeof renderProjects === "function") {
    const currentLang =
      typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id";
    renderProjects(currentLang);
  }

  if (typeof initProjectFilters === "function") {
    initProjectFilters();
  }

  // 4. Smooth Scroll for Anchor Links
  setupSmoothScrolling();

  // 5. Contact Form Handler (Formspree AJAX)
  setupContactForm();

  // 6. Scroll Reveal Animation
  initScrollReveal();
});

/**
 * Configure Smooth Scrolling for all internal hash links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Contact Form Handler — Formspree AJAX
 * Sends form data to Formspree without page reload,
 * shows success/error messages, and resets form on success.
 */
function setupContactForm() {
  const contactForm = document.getElementById("portfolio-contact-form");
  if (!contactForm) return;

  const successMsg = document.getElementById("form-success");
  const errorMsg = document.getElementById("form-error");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const submitBtnOriginalText = submitBtn
    ? submitBtn.textContent.trim()
    : "Kirim Pesan";

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hide previous messages
    if (successMsg) successMsg.style.display = "none";
    if (errorMsg) errorMsg.style.display = "none";

    const currentLang =
      typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id";

    // ==========================================
    // VALIDASI MANUAL
    // ==========================================
    const name = contactForm.querySelector("#form-name").value.trim();
    const email = contactForm.querySelector("#form-email").value.trim();
    const subject = contactForm.querySelector("#form-subject").value.trim();
    const message = contactForm.querySelector("#form-message").value.trim();

    // Cek: ada field kosong?
    if (!name || !email || !subject || !message) {
      const emptyMsgText =
        currentLang === "en"
          ? "Please fill in all fields before sending."
          : "Mohon lengkapi semua kolom sebelum mengirim.";
      if (errorMsg) {
        errorMsg.textContent = "⚠️ " + emptyMsgText;
        errorMsg.style.display = "block";
        errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Cek: format email valid?
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const invalidEmailText =
        currentLang === "en"
          ? "Please enter a valid email address."
          : "Mohon masukkan alamat email yang valid.";
      if (errorMsg) {
        errorMsg.textContent = "⚠️ " + invalidEmailText;
        errorMsg.style.display = "block";
        errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // ==========================================
    // SEMUA VALIDASI LULUS — LANJUT SUBMIT
    // ==========================================
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent =
        currentLang === "en" ? "Sending..." : "Mengirim...";
    }

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Success
        contactForm.reset();

        // Reset error message text ke default
        if (errorMsg) {
          errorMsg.textContent =
            "❌ Maaf, terjadi kesalahan. Coba lagi atau hubungi saya via email langsung.";
        }

        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        // Server error
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (_) {
          /* ignore parse error */
        }
        console.error("Formspree error:", errorData);
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } finally {
      // Restore button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtnOriginalText;
      }
    }
  });
}

/* ==========================================================================
   SCROLL REVEAL ANIMATION
   Intersection Observer API — deteksi elemen masuk viewport
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}