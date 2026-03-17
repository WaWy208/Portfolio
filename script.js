document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const siteHeader = document.querySelector(".site-header");
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTopBtn = document.getElementById("backToTop");
  const yearSpan = document.getElementById("year");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const revealElements = document.querySelectorAll(".reveal");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const updateThemeUI = (theme) => {
    html.setAttribute("data-theme", theme);
    if (themeLabel) {
      themeLabel.textContent = theme === "light" ? "Light" : "Dark";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || (prefersDark.matches ? "dark" : "light");
  updateThemeUI(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      updateThemeUI(nextTheme);
    });
  }

  const closeMobileMenu = () => {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "Menu";
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navToggle.textContent = isExpanded ? "Menu" : "Close";
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMobileMenu();
      }
    });
  }

  const updateScrollState = () => {
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", window.scrollY > 12);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", window.scrollY > 500);
    }
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState);

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector("button[type='submit']");
      if (!submitButton) return;

      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Đang gửi...";

      setTimeout(() => {
        submitButton.textContent = "Đã gửi";
        formNote.textContent = "Cảm ơn bạn. Mình đã ghi nhận lời nhắn của bạn (mô phỏng).";
        contactForm.reset();

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          formNote.textContent = "";
        }, 2200);
      }, 1200);
    });
  }
});
