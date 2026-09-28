/* ==========================================================================
   Rizvandy Akbar P.R - Projects Data & Dynamic Renderer
   Manages portfolio projects, bilingual content, and conditional buttons
   ========================================================================== */

const projectsData = [
  {
    id: 1,
    number: "01",
    title: {
      id: "Website Portfolio Personal Developer",
      en: "Personal Developer Portfolio Website"
    },
    description: {
      id: "Website portofolio personal yang bersih, responsif, dan interaktif dengan desain monokrom. Dibuat menggunakan HTML5, CSS3 kustom, JavaScript ES6+, dan Bootstrap 5 dengan fitur switcher dua bahasa (ID/EN).",
      en: "A clean, responsive, and interactive personal portfolio website with a minimalist monochrome design. Built using HTML5, custom CSS3, JavaScript ES6+, and Bootstrap 5 featuring bilingual support (ID/EN)."
    },
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Bootstrap 5"],
    image: "assets/images/projects/project-01/thumbnail.jpg",
    github: "https://github.com/rizvandy/rizvandy-portfolio",
    demo: "https://rizvandy.github.io/rizvandy-portfolio",
    status: {
      id: "Selesai",
      en: "Completed"
    },
    category: "frontend"
  },
  {
    id: 2,
    number: "02",
    title: {
      id: "Antarmuka Web Sistem Informasi Akademik",
      en: "Academic Information System Web UI"
    },
    description: {
      id: "Desain antarmuka web interaktif untuk pengelolaan data mahasiswa, jadwal perkuliahan, dan pengisian KRS dengan layout responsif berbasis Bootstrap.",
      en: "Interactive web interface design for student data management, course schedule, and academic registration with responsive Bootstrap layout."
    },
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
    image: "assets/images/projects/project-02/thumbnail.jpg",
    github: "https://github.com/rizvandy/academic-system-ui",
    demo: null,
    status: {
      id: "Selesai",
      en: "Completed"
    },
    category: "frontend"
  },
  {
    id: 3,
    number: "03",
    title: {
      id: "Aplikasi Kuis Web Interaktif",
      en: "Interactive Web Quiz Application"
    },
    description: {
      id: "Aplikasi kuis berbasis web yang menyajikan pertanyaan pilihan ganda, timer hitung mundur, perhitungan skor otomatis, dan evaluasi jawaban.",
      en: "Web-based quiz application featuring multiple choice questions, countdown timer, automatic scoring, and answer review."
    },
    technologies: ["HTML5", "CSS3", "JavaScript ES6+"],
    image: "assets/images/projects/project-03/thumbnail.jpg",
    github: "https://github.com/rizvandy/interactive-quiz-app",
    demo: "https://rizvandy.github.io/interactive-quiz-app",
    status: {
      id: "Selesai",
      en: "Completed"
    },
    category: "frontend"
  },
  {
    id: 4,
    number: "04",
    title: {
      id: "Katalog Produk E-Commerce Landing Page",
      en: "E-Commerce Product Catalog Landing Page"
    },
    description: {
      id: "Landing page e-commerce dengan sistem pencarian dan filter produk, modal detail barang, serta kalkulasi keranjang belanja sederhana.",
      en: "E-commerce landing page featuring product search and filtering, detail modal views, and a simple shopping cart calculator."
    },
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    image: "assets/images/projects/project-04/thumbnail.jpg",
    github: null,
    demo: "https://rizvandy.github.io/ecommerce-catalog",
    status: {
      id: "Dalam Proses",
      en: "In Progress"
    },
    category: "frontend"
  }
];

/**
 * Render Project Cards into DOM
 * @param {string} lang - Current language ('id' | 'en')
 * @param {string} filter - Filter category ('all' | 'frontend' | etc)
 */
function renderProjects(lang = "id", filter = "all") {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const currentLang = lang || (typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id");

  // Clear previous content
  container.innerHTML = "";

  // Filter projects if category filter applied
  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  if (filteredProjects.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted">${currentLang === "en" ? "No projects found in this category." : "Tidak ada proyek ditemukan dalam kategori ini."}</p>
      </div>
    `;
    return;
  }

  filteredProjects.forEach((project, index) => {
    const titleText = project.title[currentLang] || project.title.id;
    const descText = project.description[currentLang] || project.description.id;
    const statusText = project.status[currentLang] || project.status.id;

    // Build Technologies HTML Badges
    const techBadgesHtml = project.technologies
      .map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
      .join("");

    // Build GitHub Button (Only if link exists)
    const githubBtnHtml = project.github ? `
      <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-project">
        <i class="fab fa-github me-1"></i> ${currentLang === "en" ? "GitHub" : "GitHub"}
      </a>
    ` : "";

    // Build Demo Button (Only if link exists)
    const demoBtnHtml = project.demo ? `
      <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-project">
        <i class="fas fa-external-link-alt me-1"></i> ${currentLang === "en" ? "Live Demo" : "Live Demo"}
      </a>
    ` : "";

    // Kartu proyek: Tambahkan class "reveal" dengan stagger delay berdasarkan index
    // Index 0 -> reveal, Index 1 -> reveal reveal-delay-1, dst. Maksimal delay-5
    const delayClass = index > 0 ? ` reveal-delay-${Math.min(index, 5)}` : "";
    
    const cardCol = document.createElement("div");
    cardCol.className = `col-12 col-md-6 col-lg-6 mb-4 reveal${delayClass}`;
    cardCol.innerHTML = `
      <div class="project-card">
        <div class="project-image-box">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(titleText)}" class="project-img" loading="lazy" onerror="this.onerror=null; this.src='assets/images/projects/placeholder.svg';">
          <span class="project-number-badge">${escapeHtml(project.number)}</span>
          <span class="project-status-badge">${escapeHtml(statusText)}</span>
        </div>
        <div class="project-content">
          <h3 class="project-title">${escapeHtml(titleText)}</h3>
          <p class="project-description">${escapeHtml(descText)}</p>
          <div class="project-tech-stack">
            ${techBadgesHtml}
          </div>
          <div class="project-actions">
            ${githubBtnHtml}
            ${demoBtnHtml}
          </div>
        </div>
      </div>
    `;

    container.appendChild(cardCol);
  });

  // PENTING: Panggil ulang initScrollReveal agar Observer mendeteksi kartu baru ini
  if (typeof initScrollReveal === "function") {
    // Gunakan setTimeout kecil untuk memastikan DOM selesai di-paint
    setTimeout(initScrollReveal, 50);
  }
}

/**
 * Utility function to escape HTML special characters
 */
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Initialize Projects Filtering UI
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach(b => b.classList.remove("active", "btn-primary"));
      filterBtns.forEach(b => b.classList.add("btn-outline-secondary"));

      btn.classList.add("active", "btn-primary");
      btn.classList.remove("btn-outline-secondary");

      const category = btn.getAttribute("data-filter");
      const currentLang = typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id";
      renderProjects(currentLang, category);
    });
  });
}