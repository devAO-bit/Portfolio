const sections = document.querySelectorAll("section");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-links a");
const navLink = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLink.classList.toggle("open");

    // Prevent background scroll
    document.body.style.overflow =
        navLink.classList.contains("open") ? "hidden" : "auto";
});

// Close menu on link click (UX improvement)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLink.classList.remove("open");
        document.body.style.overflow = "auto";
    });
});

