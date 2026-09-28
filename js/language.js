/* ==========================================================================
   Rizvandy Akbar P.R - Language Switcher (Indonesian / English)
   Handles bilingual switching, LocalStorage persistence, and DOM updates
   ========================================================================== */

// Variabel global untuk menyimpan cache terjemahan
let translations = {};

// Language State Management
let currentLanguage = localStorage.getItem("language") || "id";

/**
 * Get current active language code ('id' | 'en')
 */
function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Change language and update DOM
 * @param {string} lang - 'id' or 'en'
 */
async function setLanguage(lang) {
  if (lang !== "id" && lang !== "en") return;

  // 1. Fetch data bahasa dari folder locales jika belum ada di cache
  if (!translations[lang]) {
    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      translations[lang] = await response.json();
    } catch (error) {
      console.error(`Gagal memuat file bahasa ${lang}.json:`, error);
      return; // Hentikan proses jika gagal fetch
    }
  }

  currentLanguage = lang;
  localStorage.setItem("language", lang);

  // Update DOM html lang attribute
  document.documentElement.lang = lang;

  // Update text for all elements with data-i18n attribute
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      // Check if tag is input or textarea placeholder
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.hasAttribute("placeholder")) {
          el.placeholder = translations[lang][key];
        }
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Update UI toggler visual active states
  const optId = document.getElementById("lang-option-id");
  const optEn = document.getElementById("lang-option-en");
  
  if (optId && optEn) {
    if (lang === "id") {
      optId.classList.add("active");
      optEn.classList.remove("active");
    } else {
      optEn.classList.add("active");
      optId.classList.remove("active");
    }
  }

  // Update Resume Links according to current language
  updateResumeLinks(lang);

  // Re-render Projects dynamically when language changes
  if (typeof renderProjects === "function") {
    renderProjects(lang);
  }
}

/**
 * Dynamically set resume view and download link target depending on active language
 */
function updateResumeLinks(lang) {
  const resumeFileName = lang === "en" ? "resume-en.pdf" : "resume-id.pdf";
  const resumePath = `assets/documents/${resumeFileName}`;

  const viewBtn = document.getElementById("btn-view-resume");
  const downloadBtn = document.getElementById("btn-download-resume");
  const heroResumeBtn = document.getElementById("hero-btn-resume");

  if (viewBtn) {
    viewBtn.setAttribute("href", resumePath);
  }
  if (downloadBtn) {
    downloadBtn.setAttribute("href", resumePath);
    downloadBtn.setAttribute("download", `Rizvandy_Akbar_PR_Resume_${lang.toUpperCase()}.pdf`);
  }
  if (heroResumeBtn) {
    heroResumeBtn.setAttribute("href", resumePath);
    heroResumeBtn.setAttribute("download", `Rizvandy_Akbar_PR_Resume_${lang.toUpperCase()}.pdf`);
  }
}

/**
 * Initialize Language Switcher Module
 */
async function initLanguageSwitcher() {
  const switchBtn = document.getElementById("lang-switcher");
  if (switchBtn) {
    switchBtn.addEventListener("click", () => {
      const nextLang = currentLanguage === "id" ? "en" : "id";
      setLanguage(nextLang);
    });
  }

  // Apply default or saved language on page load
  await setLanguage(currentLanguage);
}