/* ==========================================================================
   Rizvandy Akbar P.R - Navigation Module
   Navbar scrolling effect, active state highlight (ScrollSpy), and mobile auto-close
   ========================================================================== */

function initNavigation() {
  const navbar = document.getElementById("main-navbar");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("navbarNav");
  
  // 1. Sticky Navbar styling on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    // Highlight active nav item on scroll (ScrollSpy)
    highlightNavOnScroll();
  });

  // 2. Auto-close mobile navigation menu when a section link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Check if bootstrap collapse is open on mobile
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // 3. ScrollSpy Active Section Detection
  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 120; // Offset for sticky navbar
    const sections = document.querySelectorAll("section[id]");

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Trigger once on init
  highlightNavOnScroll();
}
