/* ==========================================================================
   Rizvandy Akbar P.R - Projects Data & Dynamic Renderer
   Manages portfolio projects and bilingual content
   ========================================================================== */

const projectsData = [
  {
    id: 1,
    title: {
      id: "Website Portfolio Personal",
      en: "Personal Portfolio Website"
    },
    description: {
      id: "Website portofolio personal yang bersih, responsif, dan interaktif dengan desain monokrom. Dilengkapi fitur bilingual (ID/EN), animasi scroll reveal, dan integrasi auto-translate menggunakan AI.",
      en: "A clean, responsive, and interactive personal portfolio website with minimalist monochrome design. Features bilingual support (ID/EN), scroll reveal animations, and AI-powered auto-translation."
    },
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Bootstrap 5", "Vercel"],
    image: "assets/images/projects/project-01/portfolio.jpg",
    github: "https://github.com/rizvandy/portfolio",
    demo: "https://rizvandy-portfolio.vercel.app"
  },
  {
    id: 2,
    title: {
      id: "E-Commerce Tas Online",
      en: "Online Bag E-Commerce"
    },
    description: {
      id: "Website e-commerce untuk penjualan tas dengan fitur lengkap: katalog produk, filter kategori, pencarian, detail produk, keranjang belanja, wishlist, checkout, serta sistem login & register. Mendukung dua bahasa (ID/EN).",
      en: "E-commerce website for selling bags with complete features: product catalog, category filter, search, product detail, shopping cart, wishlist, checkout, and login & register system. Supports bilingual (ID/EN)."
    },
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Bootstrap 5"],
    image: "assets/images/projects/project-02/shop_bag.jpg",
    github: "https://github.com/rizvandy/Website-E-Commerce-Bag",
    demo: "https://rizvandy.github.io/Website-E-Commerce-Bag/"
  },
  {
    id: 3,
    title: {
      id: "Byte & Brew - Sistem Pesan Kopi Online",
      en: "Byte & Brew - Online Coffee Ordering System"
    },
    description: {
      id: "Aplikasi web untuk memesan kopi secara online. Pengguna dapat memilih menu, memfilter berdasarkan kategori, melakukan checkout, dan menerima email konfirmasi pesanan secara otomatis setelah checkout.",
      en: "Web application for ordering coffee online. Users can browse the menu, filter by category, checkout, and receive an automatic order confirmation email after checkout."
    },
    technologies: ["Blade", "PHP", "JavaScript", "CSS3"],
    image: "assets/images/projects/project-03/coffee_shop.jpg",
    github: "https://github.com/rizvandy/Website-Pesan-Kopi",
    demo: null
  },
  {
    id: 4,
    title: {
      id: "My Notes - Aplikasi Catatan Pribadi",
      en: "My Notes - Personal Note-Taking App"
    },
    description: {
      id: "Aplikasi catatan pribadi berbasis web dengan sistem login & register. Pengguna dapat menulis dan mengelola catatan harian mereka dengan antarmuka yang sederhana dan mudah digunakan.",
      en: "Web-based personal note-taking app with login & register system. Users can write and manage their daily notes with a simple and easy-to-use interface."
    },
    technologies: ["HTML5", "JavaScript", "CSS3"],
    image: "assets/images/projects/project-04/notes_app.jpg",
    github: "https://github.com/rizvandy/My_Notes",
    demo: null
  }
];

/**
 * Render Project Cards into DOM
 * @param {string} lang - Current language ('id' | 'en')
 */
function renderProjects(lang = "id") {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const currentLang = lang || (typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "id");

  // Clear previous content
  container.innerHTML = "";

  projectsData.forEach((project, index) => {
    const titleText = project.title[currentLang] || project.title.id;
    const descText = project.description[currentLang] || project.description.id;

    // Build Technologies HTML Badges
    const techBadgesHtml = project.technologies
      .map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
      .join("");

    // Build GitHub Button (Only if link exists)
    const githubBtnHtml = project.github ? `
      <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-project">
        <i class="fab fa-github me-1"></i> GitHub
      </a>
    ` : "";

    // Build Demo Button (Only if link exists)
    const demoBtnHtml = project.demo ? `
      <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-project">
        <i class="fas fa-external-link-alt me-1"></i> Live Demo
      </a>
    ` : "";

    // Stagger delay untuk animasi reveal
    const delayClass = index > 0 ? ` reveal-delay-${Math.min(index, 5)}` : "";

    const cardCol = document.createElement("div");
    cardCol.className = `col-12 col-md-6 mb-4 reveal${delayClass}`;
    cardCol.innerHTML = `
      <div class="project-card">
        <div class="project-image-box">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(titleText)}" class="project-img" loading="lazy" onerror="this.onerror=null; this.src='assets/images/projects/placeholder.svg';">
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

  // Panggil ulang initScrollReveal agar Observer mendeteksi kartu baru
  if (typeof initScrollReveal === "function") {
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
 * Placeholder untuk kompatibilitas (filter sudah dihapus)
 */
function initProjectFilters() {
  // No-op: filter sudah dihapus
}