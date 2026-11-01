// ============================
// 1. MOBILE NAVIGATION
// ============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navLinks a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// ============================
// 2. DARK / LIGHT THEME
// ============================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☼";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
}

updateThemeButton();

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    const currentTheme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolioTheme", currentTheme);

    updateThemeButton();
});


// ============================
// 3. SCROLL REVEAL ANIMATIONS
// ============================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ============================
// 4. TOAST NOTIFICATION
// ============================

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}


// ============================
// 5. COPY EMAIL
// ============================

const email = "anshikagupta.csds@gmail.com";

async function copyText(text, successMessage) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement("textarea");

            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);

            textArea.select();

            const copied = document.execCommand("copy");

            textArea.remove();

            if (!copied) {
                throw new Error("Copy failed");
            }
        }

        showToast(successMessage);

    } catch (error) {
        showToast("Copy failed. Please copy it manually.");
    }
}

document.getElementById("copyEmail").addEventListener("click", function () {
    copyText(email, "Email copied successfully!");
});

document.getElementById("copyEmailTop").addEventListener("click", function () {
    copyText(email, "Email copied successfully!");
});


// ============================
// 6. COPY PORTFOLIO LINK
// ============================

document.getElementById("copyPortfolio").addEventListener(
    "click",
    function () {
        copyText(
            window.location.href,
            "Portfolio link copied!"
        );
    }
);


// ============================
// 7. CONTACT FORM
// ============================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const visitorName = document.getElementById("visitorName").value.trim();

    const visitorEmail = document.getElementById("visitorEmail").value.trim();

    const visitorMessage = document.getElementById("visitorMessage").value.trim();

    if (!visitorName || !visitorEmail || !visitorMessage) {
        showToast("Please complete all the fields.");
        return;
    }

    const subject = encodeURIComponent(
        "Portfolio Contact - " + visitorName
    );

    const body = encodeURIComponent(
        "Name: " + visitorName +
        "\nEmail: " + visitorEmail +
        "\n\nMessage:\n" + visitorMessage
    );

    const mailtoLink =
        "mailto:anshikagupta.csds@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;

    window.location.href = mailtoLink;

    showToast("Opening your email application...");
});


// ============================
// 8. LINKEDIN PROFILE
// ============================

// Replace this with your actual LinkedIn profile URL.

const linkedInURL = "https://www.linkedin.com/in/anshika-gupta-49b0473bb?utm_source=share_via&utm_content=profile&utm_medium=member_android";

const linkedInButtons = [
    document.getElementById("linkedinLink"),
    document.getElementById("contactLinkedIn")
];

linkedInButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        if (!linkedInURL) {
            event.preventDefault();

            showToast("Add your LinkedIn profile URL in script.js.");
        } else {
            button.href = linkedInURL;
        }
    });
});


// ============================
// 9. CUSTOM CURSOR GLOW
// ============================

const cursorGlow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", function (event) {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}


// ============================
// 10. CURRENT YEAR
// ============================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


   document.addEventListener("DOMContentLoaded", function () {

    // Floating particles
    const particleContainer = document.getElementById("particles-container");

    if (particleContainer) {
        for (let i = 0; i < 35; i++) {
            const particle = document.createElement("span");

            particle.classList.add("particle");
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 10 + "s";
            particle.style.animationDuration = (8 + Math.random() * 8) + "s";

            particleContainer.appendChild(particle);
        }
    }

    // Name letter click animation
    const letters = document.querySelectorAll(".interactive-name .name-letter");

    letters.forEach(function (letter) {
        letter.addEventListener("click", function () {
            letter.classList.remove("jump");

            void letter.offsetWidth;

            letter.classList.add("jump");
        });
    });

});