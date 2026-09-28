# Rizvandy Akbar P.R — Personal Developer Portfolio

Modern, minimalist, and clean monochrome personal portfolio website designed for **Rizvandy Akbar P.R**, an Informatics Engineering student at Universitas Dr. Soetomo currently developing expertise in Web Development and growing toward Full Stack Development.

---

## 🌟 Overview & Features

- **Unique Monochrome Visual Identity:** Built with custom CSS over Bootstrap 5 to deliver a high-contrast, professional, non-generic developer aesthetic.
- **Bilingual Support (ID / EN):** Instant language switcher with `localStorage` persistence, dynamically updating UI text without refreshing the page.
- **Modular Project Management:** Dynamic project card rendering via `js/projects.js` supporting technology tags, status badges, and conditional buttons for GitHub and Live Demo links.
- **Responsive Layout:** Mobile-first architecture using Bootstrap 5 grid and custom media queries.
- **Accessible & Lightweight:** Zero heavy JavaScript dependencies, pure HTML5/CSS3/Vanilla JS with fast load times and clean typography (Inter).
- **Personal & Honest Content:** Accurate bio, academic status, learning path timeline, formal education, and contact channels.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic document markup and accessible structure.
- **CSS3:** Custom monochrome styling (`css/style.css`), CSS variables, animations, and media queries (`css/responsive.css`).
- **Vanilla JavaScript (ES6+):** Modular scripts for language toggling, dynamic DOM rendering, smooth scrolling, and navigation interactions.
- **Bootstrap 5 (via CDN):** Used strictly for grid, container layout, navbar toggling, and utility spacing.

---

## 📁 Directory Structure

```text
rizvandy-portfolio/
│
├── index.html              # Main HTML document with semantic sections & layout
│
├── assets/                 # Static media and document assets
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile.jpg # Profile photo or avatar graphic
│   │   │
│   │   └── projects/
│   │       ├── project-01/ # Thumbnail for Project 1
│   │       ├── project-02/ # Thumbnail for Project 2
│   │       ├── project-03/ # Thumbnail for Project 3
│   │       └── project-04/ # Thumbnail for Project 4
│   │
│   ├── icons/              # Additional vector or favicon assets
│   └── documents/
│       ├── resume-id.pdf   # Resume in Indonesian
│       └── resume-en.pdf   # Resume in English
│
├── css/
│   ├── style.css           # Core portfolio design system & Bootstrap overrides
│   └── responsive.css      # Custom media queries and mobile adjustments
│
├── js/
│   ├── main.js             # General app entry point & smooth scroll handler
│   ├── navigation.js       # Sticky navbar state & mobile menu auto-close
│   ├── language.js         # Bilingual switcher dictionary & LocalStorage logic
│   └── projects.js         # Project data array & dynamic card renderer
│
└── README.md               # Documentation & setup instructions
```

---

## 🚀 How to Run Locally

1. **Option A: VS Code Live Server (Recommended)**
   - Open VS Code.
   - Open the folder `rizvandy-portfolio` or workspace directory.
   - Install the **Live Server** extension (`ms-vscode.live-server`) if not already installed.
   - Right-click `index.html` and click **"Open with Live Server"**.

2. **Option B: Node http-server / npx**
   - Open your terminal in the project directory.
   - Run:
     ```bash
     npx serve .
     ```
   - Open `http://localhost:3000` in your browser.

3. **Option C: Direct Browser Opening**
   - Simply double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 📌 How to Customize & Extend

### 1. How to Add or Modify Projects (`js/projects.js`)
Open `js/projects.js` and edit or append new project objects to the `projectsData` array:

```javascript
{
  id: 5,
  number: "05",
  title: {
    id: "Judul Proyek Baru",
    en: "New Project Title"
  },
  description: {
    id: "Deskripsi lengkap mengenai proyek baru...",
    en: "Full description about the new project..."
  },
  technologies: ["HTML5", "CSS3", "JavaScript"],
  image: "assets/images/projects/project-05/thumbnail.jpg",
  github: "https://github.com/rizvandy/project-repo", // Set to null if unavailable
  demo: "https://rizvandy.github.io/project-demo",      // Set to null if unavailable
  status: {
    id: "Selesai",
    en: "Completed"
  },
  category: "frontend"
}
```

*Note: If `github` or `demo` is set to `null`, the project card will automatically hide the corresponding button.*

### 2. How to Update Language Translations (`js/language.js`)
To change text or add new translations:
- Open `js/language.js`.
- Modify values inside `translations.id` for Indonesian or `translations.en` for English.
- Add `data-i18n="yourKeyName"` to any HTML tag in `index.html` to bind it to translation keys.

### 3. How to Update Your Resume Files
Replace the placeholder files in `assets/documents/`:
- `assets/documents/resume-id.pdf` (Indonesian version)
- `assets/documents/resume-en.pdf` (English version)

*When switching languages on the site, the "View Resume" and "Download Resume" buttons automatically update their target files.*

---

## 🌐 Deployment Options

### Deploy to GitHub Pages (Free & Easy)
1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio website"
   ```
2. Create a public repository on GitHub named `rizvandy.github.io` or `portfolio`.
3. Push code to GitHub:
   ```bash
   git remote add origin https://github.com/rizvandy/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Repository Settings** > **Pages** > Select `main` branch root (`/`) > Save. Your portfolio will be live at `https://rizvandy.github.io/portfolio`!

### Deploy to Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Other / Static Site**.
3. Click **Deploy**.

---

## 👤 Author Information

- **Name:** Rizvandy Akbar P.R
- **Education:** S1 Teknik Informatika — Universitas Dr. Soetomo, Surabaya
- **Email:** [rizvandyakbar25@gmail.com](mailto:rizvandyakbar25@gmail.com)
- **Phone:** +62 878-0326-5438
- **GitHub:** [https://github.com/rizvandy](https://github.com/rizvandy)
- **LinkedIn:** [https://www.linkedin.com/in/rizvandy-akbar-331304372/](https://www.linkedin.com/in/rizvandy-akbar-331304372/)
- **Instagram:** [https://www.instagram.com/rizvandy_akbar/](https://www.instagram.com/rizvandy_akbar/)

© 2026 Rizvandy Akbar P.R. All rights reserved.
