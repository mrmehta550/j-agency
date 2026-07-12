document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (!navbar || !hamburger || !navMenu) return;

    /*==============================
        CREATE OVERLAY
    ==============================*/
    let overlay = document.querySelector(".nav-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "nav-overlay";
        document.body.appendChild(overlay);
    }

    /*==============================
        OPEN MENU
    ==============================*/
    function openMenu() {
        hamburger.classList.add("active");
        hamburger.setAttribute("aria-expanded", "true");
        navMenu.classList.add("active");
        overlay.classList.add("show");
        document.body.classList.add("menu-open");
    }

    /*==============================
        CLOSE MENU
    ==============================*/
    function closeMenu() {
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
        overlay.classList.remove("show");
        document.body.classList.remove("menu-open");

        dropdowns.forEach(drop => {
            drop.classList.remove("open");
        });
    }

    /*==============================
        HAMBURGER TOGGLE
    ==============================*/
    hamburger.addEventListener("click", function () {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    /*==============================
        OVERLAY CLICK
    ==============================*/
    overlay.addEventListener("click", closeMenu);

    /*==============================
        MOBILE DROPDOWN
    ==============================*/
    dropdowns.forEach(function (dropdown) {
        const link = dropdown.children[0];

        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle("open");
            }
        });
    });

    /*==============================
        ACTIVE LINK HIGHLIGHTING
    ==============================*/
    const current = window.location.pathname;

    document.querySelectorAll(".nav-menu a").forEach(function (link) {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        if (current === href) {
            link.classList.add("active");
        }
    });

    /*==============================
        STICKY NAVBAR / SCROLL HIDE
    ==============================*/
    let lastScroll = 0;

    window.addEventListener("scroll", function () {
        const scroll = window.scrollY; // Updated to modern standard

        // Add drop shadow
        if (scroll > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Hide/Show logic
        if (scroll > 120) {
            if (scroll > lastScroll) {
                navbar.classList.add("hide"); // Scrolling down
            } else {
                navbar.classList.remove("hide"); // Scrolling up
            }
        } else {
            navbar.classList.remove("hide"); // Always show at the very top
        }

        lastScroll = scroll;
    });

    /*==============================
        CLOSE MENU ON LINK CLICK
    ==============================*/
    document.querySelectorAll(".nav-menu a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                window.innerWidth <= 1024 &&
                !this.parentElement.classList.contains("dropdown")
            ) {
                closeMenu();
            }
        });
    });

    /*==============================
        ESC KEY ACCESSIBILITY
    ==============================*/
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    /*==============================
        RESET ON RESIZE
    ==============================*/
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024 && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });
});