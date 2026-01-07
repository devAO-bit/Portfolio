// Load saved preferences
const savedTheme = localStorage.getItem("portfolio-theme") || "blue";
const savedMode = localStorage.getItem("portfolio-mode") || "dark";
const savedBg = localStorage.getItem("portfolio-bg") || "default";

document.body.setAttribute("data-theme", savedTheme);
document.body.setAttribute("data-mode", savedMode);
document.body.setAttribute("data-bg", savedBg);

// Mode Toggle (Dark/Light)
const modeToggle = document.getElementById("modeToggle");
const modeIcon = document.getElementById("modeIcon");

function updateModeIcon() {
    const currentMode = document.body.getAttribute("data-mode");
    modeIcon.textContent = currentMode === "dark" ? "🌙" : "☀️";
}

updateModeIcon();

modeToggle.addEventListener("click", () => {
    const currentMode = document.body.getAttribute("data-mode");
    const newMode = currentMode === "dark" ? "light" : "dark";
    document.body.setAttribute("data-mode", newMode);
    localStorage.setItem("portfolio-mode", newMode);
    updateModeIcon();
    updateHeroBackground();
});

// Theme Switcher
const themeBtn = document.getElementById("themeBtn");
const themeDropdown = document.getElementById("themeDropdown");
const themeOptions = document.querySelectorAll(".theme-option");
const bgOptions = document.querySelectorAll(".bg-option");

themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle("active");
});

// Color theme selection
themeOptions.forEach((option) => {
    if (option.getAttribute("data-theme") === savedTheme) {
        option.classList.add("active");
    }

    option.addEventListener("click", () => {
        const theme = option.getAttribute("data-theme");
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);

        themeOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
        updateHeroBackground();
    });
});

// Background selection
bgOptions.forEach((option) => {
    if (option.getAttribute("data-bg") === savedBg) {
        option.classList.add("active");
    }

    option.addEventListener("click", () => {
        const bg = option.getAttribute("data-bg");
        document.body.setAttribute("data-bg", bg);
        localStorage.setItem("portfolio-bg", bg);

        bgOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
        updateHeroBackground();
    });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!themeDropdown.contains(e.target) && e.target !== themeBtn) {
        themeDropdown.classList.remove("active");
    }
});

// Hero Background Animation
function updateHeroBackground() {
    const heroBg = document.getElementById("heroBg");
    const theme = document.body.getAttribute("data-theme");
    const mode = document.body.getAttribute("data-mode");
    const bg = document.body.getAttribute("data-bg");

    if (bg !== "default") {
        heroBg.style.background = "";
        return;
    }

    const themeColors = {
        blue: { primary: "#3b82f6", accent: "#06b6d4" },
        purple: { primary: "#a855f7", accent: "#ec4899" },
        green: { primary: "#10b981", accent: "#34d399" },
        orange: { primary: "#f97316", accent: "#fb923c" },
        red: { primary: "#ef4444", accent: "#f87171" },
        cyan: { primary: "#06b6d4", accent: "#22d3ee" },
        pink: { primary: "#ec4899", accent: "#f472b6" },
        indigo: { primary: "#6366f1", accent: "#818cf8" },
    };

    const colors = themeColors[theme];
    const opacity = mode === "dark" ? "0.1" : "0.05";

    heroBg.style.background = `
                radial-gradient(circle at 20% 50%, ${colors.primary
        }${opacity.replace("0.", "")} 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${colors.accent
        }${opacity.replace("0.", "")} 0%, transparent 50%)
            `;
}

updateHeroBackground();

// Download Resume
// Contact Form
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMessage");
    msg.textContent = "Thank you! Your message has been sent.";
    msg.className = "form-message success";
    msg.style.display = "block";
    e.target.reset();
    setTimeout(() => (msg.style.display = "none"), 5000);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

// Mobile menu
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    const nav = document.querySelector(".nav-links");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "100%";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.background = "var(--bg-dark)";
        nav.style.padding = "2rem";
    }
});
